const userSignup = `INSERT INTO users(firstName, lastName, email, password, phoneNumber, type, isAdmin)
VALUES($1, $2, $3, $4, $5, $6, $7)
RETURNING id, firstName, lastName, email, phoneNumber, type, isAdmin, registeredOn`;
const userDetails = 'SELECT * FROM users WHERE email = $1';

const fullName = 'SELECT firstname ||\' \'|| lastname as name FROM users WHERE email=$1';


const userId = 'SELECT * FROM users WHERE id = $1';


export {
  userSignup, userDetails, fullName, userId,
};
