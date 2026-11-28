import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { emailExists, createUser } from '../../models/forms/registration.js';

const registrationValidation = [
  body('first_name').trim()
    .notEmpty().withMessage('First name is required.')
    .isLength({ max: 50 }).withMessage('First name must be 50 characters or fewer.'),
  body('last_name').trim()
    .notEmpty().withMessage('Last name is required.')
    .isLength({ max: 50 }).withMessage('Last name must be 50 characters or fewer.'),
  body('email').trim().toLowerCase()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Enter a valid email address.')
    .isLength({ max: 255 }).withMessage('Email is too long.')
    .custom(async (email) => {
      if (await emailExists(email)) {
        throw new Error('An account with that email already exists.');
      }
    }),
  body('password')
    .isLength({ max: 72 }).withMessage('Password must be 72 characters or fewer.')
    .isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    .withMessage('Password must be at least 8 characters with an uppercase letter, a lowercase letter, a number, and a symbol.'),
  body('confirm_password')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match.')
];

const showRegistrationForm = (req, res) => {
  res.render('forms/registration/form', { title: 'Create Account', errors: [], formData: {} });
};

const submitRegistration = async (req, res) => {
  const errors = validationResult(req);
  const { first_name, last_name, email, password } = req.body;

  if (!errors.isEmpty()) {
    return res.status(400).render('forms/registration/form', {
      title: 'Create Account',
      errors: errors.array(),
      formData: { first_name, last_name, email } // never send the password back
    });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await createUser({ firstName: first_name, lastName: last_name, email, passwordHash });

  res.redirect('/login?registered=1');
};

export { registrationValidation, showRegistrationForm, submitRegistration };