const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
mongoose.connect(`mongodb+srv://jeremy:${process.env.MONGO_PASS}@cluster0.tjm5l.mongodb.net/go-fullstack?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB.'))
  .catch(() => console.log('Failed to connect MongoDB.'));

app.use(cors());
app.use(bodyParser.json());

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;