const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// allow cros-origin requests
app.use(cors());

// connect to atlass db
mongoose.connect(
	`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@graphql-learning-sygbu.mongodb.net/test?retryWrites=true&w=majority`,
	{ useNewUrlParser: true }
);
mongoose.connection.once('open', () => {
	console.log('connected to db');
});

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);

app.listen(4000, () => console.log('now listening for requrest on port 4000'));
