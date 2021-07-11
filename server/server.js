const express = require('express');
const router = require('./routes/router');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
require('dotenv').config();

console.log('Connecting to the Databse...')
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', (e) => console.error(e));
db.once('open', () => console.log('Connected to the Database!'))

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

app.use(express.json());
app.use(cors());
app.use('/api', router);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});