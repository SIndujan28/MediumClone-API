import { Router } from 'express';
import validate from 'express-validation';

import * as userController from './user.controllers';
import userValidation from './user.validation';
import { authLocal } from './../../services/auth.services';

const routes = new Router();

routes.post('/signup', validate(userValidation.signup), userController.Signup);
routes.post('/login', authLocal, userController.login);

export default routes;
