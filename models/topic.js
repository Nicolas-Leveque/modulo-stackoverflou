const mongoose = require('mongoose');
const validator = require('validator');

const topicSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			maxlength: 32,
			trim: true,
			set: sanitizeEntries,
		},
		description: {
			type: String,
			required: true,
			trim: true,
			set: sanitizeEntries,
		},
		UserId: {
			type: String,
			required: true,
		},
		creationDate: {
			type: Date,
			default: Date.now,
		},
	},
	{ collection: 'topic' }
);

function sanitizeEntries(value) {
	return validator.escape(value);
}

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;
