import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

import validator from 'validator';
import { passwordConfig } from './user.validation';
import constants from './../../config/constants';
import Post from './../posts/post.model';

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'email address is required'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email',
    },
  },
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
    trim: true,
  },
  userName: {
    type: String,
    unique: [true, 'the name is already taken'],
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    trim: true,
    minlength: [6, 'Password must have atleast 6 characters with a number'],
    validate: {
      validator(password) {
        return passwordConfig.test(password);
      },
      message: '{VALUE} is not a valid password!',
    },
  },
  favourites: {
    posts: [{
      type: Schema.Types.ObjectId,
      ref: 'Post',
    }],

  },
}, { timestamps: true });
userSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken ',
});
userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = this._hashpassword(this.password);
  }
  return next();
});
userSchema.methods = {
  _hashpassword(password) {
    return hashSync(password);
  },
  authenticateUser(password) {
    return compareSync(password, this.password);
  },
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      constants.JWT_SECRET,
    );
  },
  toAuthJSON() {
    return {
      _id: this._id,
      userName: this.userName,
      token: `JWT ${this.createToken()}`,
      email: this.email,
    };
  },
  toJSON() {
    return {
      _id: this._id,
      userName: this.userName,
    };
  },
  _favourites: {
    async posts(postId) {
      console.log(this.favourites.posts, postId);
      if (this.favourites.posts.indexOf(postId) >= 0) {
        this.favourites.posts.remove(postId);
        await Post.decFavouriteCount(postId);
      } else {
        this.favourites.posts.push(postId);
        await Post.incFavouriteCount(postId);
      }

      return this.save();
    },
  },
};

export default mongoose.model('User', userSchema);
