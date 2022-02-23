const Topic = require('../models/topic');

exports.createTopic = async (req, res) => {
	try {
		// const newTopic = { ...req.body }
		const topic = new Topic({
			...req.body,
		});
		await topic.save();
		res.status(201).send({ message: 'Topic créé' });
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.getTopics = async (req, res) => {
	try {
		const topics = await Topic.find();
		res.status(200).send(topics);
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.getOneTopic = async (req, res) => {
	try {
		const topic = await Topic.findById(req.params.id);
		if (!topic) {
			res.status(404).send();
		}
		res.send(topic);
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.modifyTopic = async (req, res) => {
	try {
		const topic = await Topic.updateOne(
			{ _id: req.params.id },
			{ ...req.body, _id: req.params.id }
		);
		res.send({ message: 'topic modifié ' });
	} catch (e) {
		res.status(500).send(e);
	}
};

exports.deleteTopic = async (req, res) => {
	try {
		await Topic.deleteOne({ _id: req.params.id });
		res.status(200).json({ message: 'topic supprimée' });
	} catch (e) {
		res.status(500).send(e);
	}
};
