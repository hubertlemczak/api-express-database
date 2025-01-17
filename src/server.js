const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

const booksRouter = require('./routes/books.js');
const petsRouter = require('./routes/pets.js');
const breedsRouter = require('./routes/breeds.js');

app.use('/books', booksRouter);
app.use('/pets', petsRouter);
app.use('/breeds', breedsRouter);

module.exports = app;
