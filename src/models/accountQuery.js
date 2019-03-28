const createAccount = `INSERT INTO accounts(accountNumber, owner, type, passportUrl)
VALUES($1, $2, $3, $4)
RETURNING id, accountNumber, owner, type, passportUrl, status, balance, createdOn`;

const accountDetails = 'SELECT * FROM accounts WHERE accountNumber= $1';

const viewAccounts = 'SELECT * FROM accounts';

const updateAccountStatus = 'UPDATE accounts SET status = $1 WHERE accountNumber = $2';

const deleteAccount = 'DELETE from accounts where accountNumber = $1';

export {
  createAccount, accountDetails, viewAccounts, updateAccountStatus, deleteAccount,
};
