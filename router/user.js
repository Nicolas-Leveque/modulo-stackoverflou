const express = require('express');
const router = express.Router();
const validateEmail = require('../middleware/validate-email');

const userCtrl = require('../controllers/user');

router.post('/register', validateEmail, userCtrl.register);

router.post('/login', userCtrl.login);

router.get('/getUser', userCtrl.getUsers);

module.exports = router;
