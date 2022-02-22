const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
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

mongoose
	.connect(
		`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.01mkz.mongodb.net/stackfloudb?retryWrites=true&w=majority`
	)
	.then(() => console.log('connection successful'))
	.catch(() => console.log('connection failed'));

module.exports = app;
