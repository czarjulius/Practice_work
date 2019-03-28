/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import db from './db';

const tableQuery = async () => {
  try {
    const dropUserTable = await db.query('DROP TABLE IF EXISTS users CASCADE;');
    const dropAcountTable = await db.query('DROP TABLE IF EXISTS accounts CASCADE;');
    const dropTransactionTable = await db.query('DROP TABLE IF EXISTS transactions CASCADE;');

    const userTable = await db.query(`CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      firstName VARCHAR(50) NOT NULL,
      lastNAme VARCHAR(50) NOT NULL,
      email VARCHAR(50) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      phoneNumber VARCHAR(15) NOT NULL,
      type VARCHAR(15) DEFAULT 'user',
      isAdmin BOOLEAN DEFAULT FALSE,
      registeredOn DATE DEFAULT CURRENT_TIMESTAMP
    )`);

    const accountTable = await db.query(`CREATE TABLE IF NOT EXISTS accounts(
      id SERIAL PRIMARY KEY,
      accountNumber VARCHAR(50) UNIQUE NOT NULL,
      type VARCHAR(15) NOT NULL,
      status VARCHAR(15) DEFAULT 'active',
      owner INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      passportUrl TEXT NOT NULL,
      balance float DEFAULT '0.00',
      createdOn DATE DEFAULT CURRENT_TIMESTAMP)`);

    const transactionTable = await db.query(`CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY,
      accountNumber VARCHAR(50) UNIQUE NOT NULL,
      amount float NOT NULL,
      cashier INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type VARCHAR(15) NOT NULL,
      balance float DEFAULT '0.00',
      createdOn DATE DEFAULT CURRENT_TIMESTAMP)`);

    const userValues = ['admin', 'admin', 'admin@banka.com', bcrypt.hashSync('admin@1', 10), '08135778669', 'staff', 'true'];
    const admin = await db.query('INSERT into users(firstName, lastName, email, password, phoneNumber, type, isAdmin) VALUES($1,$2,$3,$4,$5,$6,$7)', userValues);
    const accountValues = ['3056234123', 1, 'savings', 'www.admin.png'];
    const insertAcccount = await db.query('INSERT INTO accounts(accountNumber, owner, type, passportUrl) VALUES($1,$2,$3,$4)', accountValues);

    const transactionValues = ['3056234123', 0, 1, 'debit'];
    const insertTransaction = await db.query('INSERT INTO transactions(accountNumber, amount, cashier, type) VALUES($1,$2,$3,$4)', transactionValues);

    console.log(dropUserTable, dropAcountTable, dropTransactionTable);
  } catch (err) {
    console.log(err.stack);
    return err.stack;
  }
};

tableQuery();
