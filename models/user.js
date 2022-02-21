const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		unique: true,
		trim: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
	},
	nickName: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		trim: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minlenght: 8,
	},
	creationDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

userSchema > plugin(uniqueValidator);

userSchema.pre('save', async function (next) {
	const user = this;
	if (user.isModified(ṕassword)) {
		user.password = await bcrypt.hash(user.password, 8);
	}
	next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
