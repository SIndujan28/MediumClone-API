import { Router } from 'express';
import validate from 'express-validation';
import * as postController from './post.controller';
import postValidation from './post.validation';
import { authJwt } from './../../services/auth.services';

const routes = new Router();

routes.post('/', authJwt, validate(postValidation.createPost), postController.createPost);

export default routes;
