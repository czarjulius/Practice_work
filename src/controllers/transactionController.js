import {
  createTransaction, selectSpecificTransaction, viewAllTransactions, updateAccountBalance, selectSpecificAccountBalance,
} from '../models/transactionQuery';
import {
  createAccount, accountDetails,
} from '../models/accountQuery';
import db from '../models/db';

class TransactionController {
  static async creditUser(req, res) {
    try {
      const { accountNumber } = req.params;
      const { amount } = req.body;
      const { cashier } = req.userData.id;
      const type = 'credit';

      const { rows } = await db.query(accountDetails, [accountNumber]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }

      let balance = await db.query(selectSpecificAccountBalance, [accountNumber]) + amount;

      balance = await db.query(updateAccountBalance, [accountNumber]);

      const values = [accountNumber, amount, cashier, type, balance];

      const result = await db.query(createTransaction, values);
      return res.status(201).json({
        status: 201,
        data: {
          id: result.rows[0].id,
          accountNumber: result.rows[0].accountNumber,
          amount: result.rows[0].amount,
          type: result.rows[0].type,
          cashier: result.rows[0].cashier,
          balance: result.rows[0].balance,
          createdOn: result.rows[0].createdOn,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async debitUser(req, res) {
    try {
      const { accountNumber } = req.params;
      const { amount } = req.body;
      const { cashier } = req.userData.id;
      const type = 'credit';

      const { rows } = await db.query(accountDetails, [accountNumber]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }

      let balance = await db.query(selectSpecificAccountBalance, [accountNumber]) - amount;

      balance = await db.query(updateAccountBalance, [accountNumber]);

      const values = [accountNumber, amount, cashier, type, balance];

      const result = await db.query(createTransaction, values);
      return res.status(201).json({
        status: 201,
        data: {
          id: result.rows[0].id,
          accountNumber: result.rows[0].accountNumber,
          amount: result.rows[0].amount,
          type: result.rows[0].type,
          cashier: result.rows[0].cashier,
          balance: result.rows[0].balance,
          createdOn: result.rows[0].createdOn,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async getAllTransactions(req, res) {
    try {
      const result = await db.query(viewAllTransactions);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 400,
          error: 'no Transaction record created yet',
        });
      }
      return res.status(200).json({
        status: 200,
        data: result.rows,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async getASpecificTransaction(req, res) {
    try {
      const { accountNumber } = req.params;
      const { rows } = await db.query(selectSpecificTransaction, [accountNumber]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Transaction not found',
        });
      }

      return res.status(200).json({
        status: 200,
        data: rows[0],
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }
}

export default TransactionController;
