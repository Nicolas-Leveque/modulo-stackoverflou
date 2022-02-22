const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.register = async (req, res) => {
	const user = new User(req.body);
	try {
		await user.save();
		res.send({
			userId: user._id,
			token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
				expiresIn: '7d',
			}),
		});
	} catch (e) {
		res.status(400).send(e);
	}
};

exports.login = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			throw new Error('Erreur de connexion');
		}
		const isMatch = await bcrypt.compare(req.body.password, user.password);
		if (!isMatch) {
			throw new Error('Erreur de connexion');
		}
		res.status(200).json({
			userId: user._id,
			token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
				expiresIn: '7d',
			}),
		});
	} catch (e) {
		res.status(400).send(e);
	}
};

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.send(users);
	} catch (e) {
		res.status(400).send(e);
	}
};
