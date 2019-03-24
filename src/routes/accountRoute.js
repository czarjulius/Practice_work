import express from 'express';
import AccountController from '../controllers/accountController';
import auth from '../middlewares/authentication';
import AdminController from '../controllers/adminController';
import Role from '../middlewares/authorization';
const router = express.Router();

router.post('/accounts', auth, AccountController.postAccount);
router.patch('/accounts/:accountNumber', auth, Role.adminStaff, AdminController.updateAccount);
router.delete('/accounts/:accountNumber', auth, Role.adminStaff, AdminController.deleteAccount);

export default router;
