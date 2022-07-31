const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { urlRegex } = require('../utils/urlRegex');

// Роутинг данных фильмов
router.get('/', getMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi
      .string()
      .required(),
    director: Joi
      .string()
      .required(),
    duration: Joi
      .number()
      .required(),
    year: Joi
      .string()
      .required(),
    description: Joi
      .string()
      .required(),
    image: Joi
      .string()
      .pattern(urlRegex)
      .required(),
    trailerLink: Joi
      .string()
      .pattern(urlRegex)
      .required(),
    thumbnail: Joi
      .string()
      .pattern(urlRegex)
      .required(),
    owner: Joi
      .string()
      .alphanum()
      .length(24)
      .hex()
      .required(),
    movieId: Joi
      .number()
      .required(),
    nameRU: Joi
      .string()
      .required(),
    nameEN: Joi
      .string()
      .required(),
  }),
}), createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi
      .string()
      .alphanum()
      .length(24)
      .hex()
      .required(),
  }),
}), deleteMovie);

module.exports = router;
