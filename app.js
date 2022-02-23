const express = require('express');
const bodyParser = require('body-parser');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./router/user');
const topicRouter = require('./router/topic');
const messageRouter = require('./router/message');
require('dotenv').config();

const app = express();

const corsOptions = {
	origin: '*',
	alloweHeaders: 'Content-Type, Authorization',
	methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
	optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(mongoSanitize());

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.01mkz.mongodb.net/stackfloudb?retryWrites=true&w=majority`
	)
	.then(() => console.log('connection successful'))
	.catch(() => console.log('connection failed'));

app.use('/user', userRouter);
app.use('/topic', topicRouter);
app.use('/message', messageRouter);
module.exports = app;
