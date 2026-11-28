import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { getUserByEmail } from '../../models/forms/login.js';

// Compared against when the email doesn't exist, so response time doesn't reveal valid emails
const DUMMY_HASH = await bcrypt.hash('not-a-real-password', 10);

const loginValidation = [
  body('email').trim().toLowerCase()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Enter a valid email address.'),
  body('password')
    .notEmpty().withMessage('Password is required.')
];

const renderLogin = (res, status, { errors = [], email = '', registered = false } = {}) => {
  res.status(status).render('forms/login/form', {
    title: 'Log In',
    errors,
    formData: { email },
    registered
  });
};

const showLoginForm = (req, res) => {
  renderLogin(res, 200, { registered: req.query.registered === '1' });
};

const submitLogin = async (req, res) => {
  const errors = validationResult(req);
  const { email, password } = req.body;

  if (!errors.isEmpty()) {
    return renderLogin(res, 400, { errors: errors.array(), email });
  }

  const user = await getUserByEmail(email);
  const passwordMatches = await bcrypt.compare(password, user ? user.password_hash : DUMMY_HASH);

  if (!user || !passwordMatches) {
    return renderLogin(res, 401, { errors: [{ msg: 'Invalid email or password.' }], email });
  }

  // New session ID on login (prevents session fixation)
  await new Promise((resolve, reject) => {
    req.session.regenerate(err => (err ? reject(err) : resolve()));
  });

  // Store only what the app needs; never the password hash
  req.session.user = {
    userId: user.user_id,
    firstName: user.first_name,
    email: user.email,
    role: user.role_name
  };

  await new Promise((resolve, reject) => {
    req.session.save(err => (err ? reject(err) : resolve()));
  });

  res.redirect('/');
};

const logout = async (req, res) => {
  await new Promise((resolve, reject) => {
    req.session.destroy(err => (err ? reject(err) : resolve()));
  });
  res.clearCookie('sid');
  res.redirect('/');
};

export { loginValidation, showLoginForm, submitLogin, logout };