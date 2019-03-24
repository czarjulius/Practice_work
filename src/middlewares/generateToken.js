import jwt from 'jsonwebtoken';

const generateToken = (id, email, isAdmin) => {
  const token = jwt.sign({
    id,
    email,
    isAdmin,
  },
  process.env.SECRET_KEY, {
    expiresIn: '24h',
  });

  return token;
};

export default generateToken;
