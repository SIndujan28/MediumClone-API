import { Router } from 'express';
import validate from 'express-validation';

import * as userController from './user.controllers';
import userValidation from './user.validation';

const routes = new Router();

routes.post('/signup', validate(userValidation.signup), userController.Signup);

export default routes;
