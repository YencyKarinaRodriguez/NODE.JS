const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const app = express();

mongoose.connect('mongodb://localhost/biblioteca', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.use(express.static('public'));

app.listen(puerto, () => {
  console.log(`Server Express.js escuchando en el puerto ${puerto}`);
});