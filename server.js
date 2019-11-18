require('dotenv').config();
const express = require('express');
const app = express()
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

// Use JSON parsers
app.use(express.json());
app.use(express.urlencoded());

// Define Routers
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

// Start Express Application
app.listen(8000, () => console.log('server started!'));