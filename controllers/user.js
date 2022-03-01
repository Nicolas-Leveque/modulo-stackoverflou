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
			nickName: user.nickName,
			email: user.email,
			token: jwt.sign(
				{ userId: user._id, nickName: user.nickName, email: user.email },
				process.env.JWT_SECRET,
				{
					expiresIn: 60 * 60 * 24,
				}
			),
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
			nickName: user.nickName,
			email: user.email,
			token: jwt.sign(
				{ userId: user._id, nickName: user.nickName, email: user.email },
				process.env.JWT_SECRET,
				{
					expiresIn: 60 * 60 * 24,
				}
			),
		});
	} catch (e) {
		res.status(400).send(e);
	}
};

exports.deleteUser = async (req, res) => {
	try {
		await User.deleteOne({ _id: req.params.id });
		res.status(200).json({ message: 'Utilisateur supprimé' });
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.modifyUser = async (req, res) => {
	try {
		const user = await User.updateOne(
			{ _id: req.params.id },
			{ ...req.body, _id: req.params.id }
		);
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.refreshToken = async (req, res) => {
	try {
		const isValid = await jwt.verify(req.body.token, process.env.JWT_SECRET);
		const newToken = jwt.sign(
			{
				userId: isValid.userId,
				nickName: isValid.nickName,
				email: isValid.email,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: 60 * 60 * 24,
			}
		);
		res.status(200).json({ isValid, newToken });
	} catch (e) {
		res.status(500).send(e);
	}
};
