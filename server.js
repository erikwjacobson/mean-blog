require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('connected to database'));

// Use JSON parsers
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.use(function(req,res,next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Credentials', true);
    next();
})

// Define Routers
const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

// Start Express Application
app.listen(8000, () => console.log('blog server started!'));