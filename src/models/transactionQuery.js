const createTransaction = `INSERT INTO transacctions(accountNumber, amount, cashier, type, balance)
VALUES($1, $2, $3, $4, $5)
RETURNING id, accountNumber, amount, cashier, type, status, balance, createdOn`;

const selectSpecificTransaction = 'SELECT * FROM transactions WHERE id= $1';

const viewAllTransactions = 'SELECT * FROM transactions';

const updateAccountBalance = (operation) => {
  const operationType = operation === 'credit' ? '+' : '-';
  return `UPDATE 
  accounts 
  SET balance 
  = balance ${operationType} $1
  WHERE accountNumber = $2`;
};

const selectSpecificAccountBalance = 'SELECT balance FROM accounts WHERE accountNumber= $1';


export {
  createTransaction,
  selectSpecificTransaction,
  viewAllTransactions,
  updateAccountBalance,
  selectSpecificAccountBalance,
};
