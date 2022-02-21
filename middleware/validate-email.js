const validator = require('validator');

const validateEmail = (req, res, next) => {
	if (!validator.isEmail(req.body.email)) {
		throw new Error('email non valide');
	}
	next();
};

module.exports = validateEmail;
