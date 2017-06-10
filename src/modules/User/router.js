import {Router} from 'express';
import validate from 'express-validation';

import * as userController from './controller';
import userValidation from './validation';
import {authLocal} from '../../services/auth';

const router = new Router();

router.post('/signup', validate(userValidation.signup), userController.signUp);
router.post('/login', authLocal, userController.login);

export default router;