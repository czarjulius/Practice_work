import express from 'express';
import UserController from '../controllers/userController';
import { validateSignup, validateLogin } from '../middlewares/validateUser';

const router = express.Router();

router.post('/auth/signup', validateSignup, UserController.userSignup);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getASpecificUser);
router.post('/auth/signin', validateLogin, UserController.userLogin);

export default router;
