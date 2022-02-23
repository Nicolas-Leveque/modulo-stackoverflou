const express = require('express');
const router = express.Router();
const validateEmail = require('../middleware/validate-email');
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/register', validateEmail, userCtrl.register);
router.post('/login', userCtrl.login);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id', auth, userCtrl.modifyUser);

module.exports = router;
