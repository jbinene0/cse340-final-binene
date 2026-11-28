import { Router } from 'express';
import { homePage } from './index.js';
import { vehicleDetailPage, categoryPage } from './vehicles/vehicles.js';
import { contactValidation, showContactForm, submitContactForm } from './forms/contact.js';
import { registrationValidation, showRegistrationForm, submitRegistration } from './forms/registration.js';

const router = Router();

router.get('/', homePage);
router.get('/vehicle/:id', vehicleDetailPage);
router.get('/category/:category', categoryPage);
router.get('/contact', showContactForm);
router.post('/contact', contactValidation, submitContactForm);
router.get('/register', showRegistrationForm);
router.post('/register', registrationValidation, submitRegistration);

export default router;