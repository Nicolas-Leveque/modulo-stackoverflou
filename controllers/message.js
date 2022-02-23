const Message = require('../models/message');

exports.createMessage = async (req, res) => {
	try {
		const message = new Message({ ...req.body });
		await message.save();
		res.status(201).send({ message: 'Message créé' });
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.getMessages = async (req, res) => {
	try {
		const messages = await Message.find({
			topicId: req.params.topic,
		});
		res.status(200).send(messages);
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
