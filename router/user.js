const express = require('express');
const router = express.Router();
const validateEmail = require('../middleware/validate-email');
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/register', validateEmail, userCtrl.register);
router.post('/login', userCtrl.login);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id', auth, userCtrl.modifyUser);

//route de vérification et renouvellement du token
router.get('/checkToken', auth, userCtrl.verifyToken);
router.post('/token', auth, userCtrl.refreshToken);

module.exports = router;
