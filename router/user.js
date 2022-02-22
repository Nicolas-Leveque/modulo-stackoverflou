const express = require('express');
const router = express.router();
const validateEmail = require('../middleware/validate-email');

const userCtrl = require('../controllers/user');

router.post('/register', validateEmail, userCtrl.register);

router.post('/login', userCtrl.login);
