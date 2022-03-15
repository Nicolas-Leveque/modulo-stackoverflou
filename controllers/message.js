const Message = require('../models/message');
const User = require('../models/user');

exports.createMessage = async (req, res) => {
	try {
		const message = new Message({ ...req.body });
		const result = await message.save();
		res.status(201).send({ message: 'Message créé' }, result);
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.getOneMessage = async (req, res) => {
	try {
		const message = await Message.findById(req.params.id);
		res.status(200).send(message);
	} catch (e) {
		res.status(500).send(e);
	}
};

//Get messages by topics
exports.getMessages = async (req, res) => {
	try {
		const messages = await Message.find({
			topicId: req.params.topic,
		});
		if (typeof messages.length !== 'number') {
			throw new Error('server error');
		}
		const completeMessages = await Promise.all(
			messages.map(async (message) => {
				const user = await User.findById(message.userId);
				const m = { ...message.toObject(), nickName: user.nickName };
				return m;
			})
		);

		res.status(200).send(completeMessages);
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.modifyMessage = async (req, res) => {
	try {
		const message = await Message.updateOne(
			{ _id: req.params.id },
			{ ...req.body, _id: req.params.id }
		);
		res.status(201).send({ message: 'Message modifié ' });
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.deleteMessage = async (req, res) => {
	try {
		await Message.deleteOne({ _id: req.params.id });
		res.status(200).json({ message: 'Message supprimé' });
	} catch (e) {
		res.status(500).send(e);
	}
};
