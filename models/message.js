const mongoose = require('mongoose');
const validator = require('validator');

const messageSchema = new mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
			set: sanitizeEntries,
		},
		userId: {
			type: String,
			required: true,
		},
		topicId: {
			type: String,
			required: true,
		},
		creationDate: {
			type: Date,
			default: Date.now,
		},
	},
	{ collection: 'message' }
);

function sanitizeEntries(value) {
	return validator.escape(value);
}

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
