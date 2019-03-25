/* eslint-disable consistent-return */
import { check, validationResult } from 'express-validator/check';
import db from '../models/user';

const validateSignup = [
  check('firstName')
    .matches(/^[a-zA-Z]+$/i)
    .withMessage('firstname must contain only alphabets')
    .isLength({ min: 3 })
    .withMessage('firstname must have atleast 3 characters')
    .isLength({ max: 50 })
    .withMessage('firstname cannot have more than 15 characters')
    .matches(/^\S{3,}$/)
    .withMessage('firstname cannot contain whitespaces')
    .trim(),

  check('lastName').matches(/^[a-zA-Z]+$/i).withMessage('lastname must contain only alphabets')
    .isLength({ min: 3 })
    .withMessage('lastname must have atleast 3 characters')
    .isLength({ max: 50 })
    .withMessage('lastname cannot have more than 15 characters')
    .matches(/^\S{3,}$/)
    .withMessage('lastname cannot contain whitespaces')
    .trim(),

  check('password').isLength({ min: 6 })
    .withMessage('password must have atleast 6 characters')
    .isLength({ max: 50 })
    .withMessage('password cannot contain more than 15 characters')
    .matches(/^\S{3,}$/)
    .withMessage('password cannot contain whitespaces')
    .trim(),

  check('phoneNumber')
    .isLength({ min: 10 })
    .withMessage('please input a valid phone number')
    .isLength({ max: 15 })
    .withMessage('please input a valid phone number')
    .isNumeric()
    .withMessage('phone number must contain only numbers')
    .trim(),

  check('email')
    .isEmail()
    .withMessage('Please input a valid email address')
    .custom(value => Promise.resolve(db.filter(user => user.email === value)).then((user) => {
      if (user.length) throw new Error('email has already been registered');
    })),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        error: errors.array().map(i => i.msg),
      });
    }
    next();
  },
];
const validateLogin = [
  check('email').isEmail().withMessage('please input a valid email address')
    .trim(),
  check('password').isLength({ min: 3 }).withMessage('please input a valid password')
    .trim(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 400,
        error: errors.array().map(i => i.msg),
      });
    }
    next();
  },
];

export { validateSignup, validateLogin };
