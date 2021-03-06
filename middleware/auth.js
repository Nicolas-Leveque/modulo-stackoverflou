const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const auth = async (req, res, next) => {
	try {
		const token = req.header('Authorization').split(' ')[1];
		if (token === undefined) {
			throw new Error('Token manquant');
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findOne({
			_id: decoded.userId,
		});
		if (!user) {
			throw new Error('Utilisateur inconnu');
		}
		next();
	} catch (e) {
		res.status(401).send({ error: 'Please authenticate' });
	}
};
module.exports = auth;
