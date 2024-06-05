const express = require('express');
const Book = require('../models/book');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

router.post('/', auth, async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).send(book);
});

router.put('/:id', auth, async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(book);
});

router.delete('/:id', auth, async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;