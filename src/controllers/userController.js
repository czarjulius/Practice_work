import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import db from '../models/db';
import generateToken from '../middlewares/generateToken';
import {
  userSignup, userDetails, fullName, allUser, userId,
} from '../models/userQuery';

dotenv.config();
class User {
  static async userSignup(req, res) {
    try {
      const {
        firstName, lastName, email, phoneNumber,
      } = req.body;

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const values = [firstName, lastName, email, hashedPassword, phoneNumber];
      const result = await db.query(userSignup, values);
      const token = generateToken(result.rows[0].id, result.rows[0].email, result.rows[0].isadmin, result.rows[0].type);
      return res.header('x-access-token', token).status(201).json({
        status: 201,
        data: {
          token,
          user: {
            id: result.rows[0].id,
            firstName: result.rows[0].firstname,
            lastName: result.rows[0].lastname,
            email,
            phoneNumber: result.rows[0].phonenumber,
            type: result.rows[0].type,
            isAdmin: result.rows[0].isadmin,
            registeredOn: result.rows[0].registeredon,
          },
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const userEmail = await db.query(userDetails, [email]);
      if (!userEmail.rows.length) {
        return res.status(400).json({
          status: 400,
          error: 'invalid email or password',
        });
      }
      const userPassword = await bcrypt.compare(password, userEmail.rows[0].password);
      if ((!userEmail.rows[0]) || (userPassword === false)) {
        return res.status(400).json({
          status: 400,
          error: 'invalid email or password',
        });
      }

      const rows = userEmail;
      const {
        firstname, lastname, phonenumber, type, isadmin, registeredon,
      } = rows.rows[0];
      const token = generateToken(rows.rows[0].id, rows.rows[0].email, rows.rows[0].isadmin, rows.rows[0].type);
      return res.header('x-access-token', token).status(200).json({
        status: 200,
        data: {
          token,
          user: {
            firstName: firstname,
            lastName: lastname,
            email,
            phoneNumber: phonenumber,
            type,
            isAdmin: isadmin,
            registeredOn: registeredon,
          },

        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        error: err.message,
      });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const result = await db.query(allUser);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: 400,
          error: 'no user record created yet',
        });
      }
      delete result.rows[0].password;
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

  static async getASpecificUser(req, res) {
    try {
      const { id } = req.params;
      const { rows } = await db.query(userId, [id]);
      if (!rows[0]) {
        return res.status(404).json({
          status: 404,
          error: 'User not found',
        });
      }
      delete rows[0].password;
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

export default User;
