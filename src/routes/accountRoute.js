import express from 'express';
import AccountController from '../controllers/accountController';
import auth from '../middlewares/authentication';
const router = express.Router();

router.post('/accounts', auth, AccountController.postAccount);

export default router;
