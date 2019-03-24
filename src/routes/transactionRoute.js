import express from 'express';
import TransactionController from '../controllers/transactionController';
import Role from '../middlewares/authorization';
import auth from '../middlewares/authentication';


const router = express.Router();

router.post('/transactions/:accountNumber/debit', auth, Role.isStaff, TransactionController.debitUser);
router.post('/transactions/:accountNumber/credit', auth, Role.isStaff, TransactionController.creditUser);

export default router;
