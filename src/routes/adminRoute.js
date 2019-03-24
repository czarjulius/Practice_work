import express from 'express';
import AdminController from '../controllers/adminController';
import auth from '../middlewares/authentication';
const router = express.Router();

router.patch('/accounts/:accountNumber', auth, AdminController.updateAccount);

export default router;
