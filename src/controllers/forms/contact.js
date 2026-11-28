import { body, validationResult, matchedData } from 'express-validator';
import { saveContactMessage } from '../../models/forms/contact.js';

// Validation and sanitization rules
const contactValidation = [
  body('name').trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 100 }).withMessage('Name must be 100 characters or fewer.'),
  body('email').trim().toLowerCase()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('Enter a valid email address.')
    .isLength({ max: 255 }).withMessage('Email is too long.'),
  body('subject').trim()
    .notEmpty().withMessage('Subject is required.')
    .isLength({ max: 150 }).withMessage('Subject must be 150 characters or fewer.'),
  body('message').trim()
    .notEmpty().withMessage('Message is required.')
    .isLength({ max: 5000 }).withMessage('Message must be 5000 characters or fewer.')
];

const showContactForm = (req, res) => {
  res.render('forms/contact/form', {
    title: 'Contact Us',
    errors: [],
    formData: {},
    sent: req.query.sent === '1'
  });
};

const submitContactForm = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).render('forms/contact/form', {
      title: 'Contact Us',
      errors: errors.array(),
      formData: req.body,
      sent: false
    });
  }

  await saveContactMessage(matchedData(req));
  res.redirect('/contact?sent=1');
};

export { contactValidation, showContactForm, submitContactForm };