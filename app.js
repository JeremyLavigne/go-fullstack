const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use((req, res, next) => {
    console.log('Request sent.');
    next();
})

app.use((req, res, next) => {
    res.status(201);
    next();
})

app.use((req, res, next) => {
    res.json({ message: 'Yep, you are in.' })
    next();
})

app.use((req, res) => {
    console.log('Response received.')
})



module.exports = app;