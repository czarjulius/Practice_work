import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.post('/auth/signup', UserController.postUser);
router.get('/user', UserController.getUser);
router.post('/auth/signin', UserController.login);

export default router;
