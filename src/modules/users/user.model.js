import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';

import validator from 'validator';
import { passwordConfig } from './user.validation';

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
};

export default mongoose.model('User', userSchema);
