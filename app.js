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

const Thing = require('./models/thing');

// ====================================== Routes ========================================

app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({...req.body})
    // console.log(req.body);
    thing.save()
        .then(() => res.status(201).json({ message: 'Object has been created.' }))
        .catch((error) => res.status(400).json({ error }))
});

app.get('/api/stuff', (req, res, next) => {
    Thing.find()
        .then((things) => res.status(200).json(things))
        .catch((error) => res.status(400).json({ error }))
});

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then((thing) => res.status(200).json(thing))
        .catch((error) => res.status(404).json({ error }))
})

app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
});

module.exports = app;