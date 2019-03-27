import express from 'express';
import accountController from '../controllers/accountController';
import auth from '../middlewares/authentication';
import adminController from '../controllers/adminController';
import role from '../middlewares/authorization';
import validateAccount from '../middlewares/validateBankAccount';
import validateAccountNumber from '../middlewares/validateAccountNumber';
const router = express.Router();

router.post('/accounts', auth, validateAccount, accountController.postAccount);
router.get('/accounts', auth, role.adminStaff, accountController.getAccount);
router.patch('/account/:accountNumber', auth, validateAccountNumber, role.adminStaff, adminController.updateAccount);
router.delete('/accounts/:accountNumber', auth, validateAccountNumber, role.adminStaff, adminController.deleteAccount);

export default router;
