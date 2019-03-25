import express from 'express';
import TransactionController from '../controllers/transactionController';
import Role from '../middlewares/authorization';
import auth from '../middlewares/authentication';
import validateAmount from '../middlewares/validateTransaction';
import validateAccountNumber from '../middlewares/validateAccountNumber';
const router = express.Router();

router.post('/transactions/:accountNumber/debit', auth, validateAccountNumber, validateAmount, Role.isStaff, TransactionController.debitUser);
router.post('/transactions/:accountNumber/credit', auth, validateAccountNumber, validateAmount, Role.isStaff, TransactionController.creditUser);

export default router;
