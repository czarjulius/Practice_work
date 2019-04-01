/* eslint-disable consistent-return */
import {
  createAccount, accountDetails, viewAccounts, updateAccountStatus, deleteAccount,
} from '../models/accountQuery';
import db from '../models/db';

class AccountController {
  static async postAccount(req, res) {
    try {
      const { type, passportUrl } = req.body;
      const {
        id: userId, firstname, lastname, email,
      } = req.authUser;
      const accountNumber = Math.random().toString().slice(2, 12);

      const values = [accountNumber, userId, type, passportUrl];
      const result = await db.query(createAccount, values);
      return res.status(201).json({
        status: 201,
        data: {
          id: result.rows[0].id,
          accountNumber: result.rows[0].accountnumber,
          firstname,
          lastname,
          email,
          type,
          openingBalace: '0.00',
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async getAllAccounts(req, res) {
    try {
      const result = await db.query(viewAccounts);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 400,
          error: 'no account created yet',
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

  static async getASpecificAccount(req, res) {
    try {
      const { accountNumber } = req.params;
      const { rows } = await db.query(accountDetails, [accountNumber]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
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

  static async editAccountStatus(req, res) {
    const { accountNumber } = req.params;
    const { status } = req.body;
    const { rows } = await db.query(accountDetails, [accountNumber]);
    if (!rows[0]) {
      return res.status(404).json({
        status: 404,
        error: 'party not found',
      });
    }

    await db.query(updateAccountStatus, [status, accountNumber]);
    const result = await db.query(accountDetails, [accountNumber]);
    try {
      res.status(200).json({
        status: 200,
        message: 'Account status has been updated successfully',
        data: result.rows[0].status,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async deleteAccount(req, res) {
    try {
      const { accountNumber } = req.params;
      let { rows } = await db.query(accountDetails, [accountNumber]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'Account not found',
        });
      }
      rows = await db.query(deleteAccount, [accountNumber]);

      res.status(200).json({
        status: 200,
        message: 'Account has been deleted successfully',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}

export default AccountController;
