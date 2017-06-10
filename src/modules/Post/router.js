import {Router} from 'express';
import validate from 'express-validation';

import * as postController from './controller';
import {authJwt} from '../../services/auth';
import postValidation from './validation';

const router = new Router();

router.post('/', authJwt, validate(postValidation.createPost), postController.createPost);
router.get('/:id', postController.getPostById);
router.get('/', postController.getPostsList);
router.patch('/:id', authJwt, validate(postValidation.updatePost), postController.updatePost);
router.delete('/:id', authJwt, postController.deletePost);
router.post('/:id/favorite', authJwt, postController.favoritePost);

export default router;