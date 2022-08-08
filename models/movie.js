const mongoose = require('mongoose');
const isURL = require('validator/lib/isURL');

const { MESSAGE } = require('../utils/responseInfo');

// Схема для данных фильма
const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: MESSAGE.URL_INCORRECT,
    },
    required: true,
  },
  trailerLink: {
    type: String,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: MESSAGE.URL_INCORRECT,
    },
    required: true,
  },
  thumbnail: {
    type: String,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: MESSAGE.URL_INCORRECT,
    },
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
