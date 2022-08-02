const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/urlRegex');

// Валидация при создании пользователя
const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30)
      .required(),
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .required(),
  }),
});

 // Валидация при аутентификации
const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .required(),
  }),
});

// Валидация при обновлении данных пользователя
const updateUserDataValidation = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .min(2)
      .max(30)
      .required(),
    email: Joi
      .string()
      .email()
      .required(),
  }),
});

// Валидация при создании карточки фильма
const createMovieValidation = celebrate({
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
});

// Валидация при удалении карточки фильма
const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    movieId: Joi
      .string()
      .alphanum()
      .length(24)
      .hex()
      .required(),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  updateUserDataValidation,
  createMovieValidation,
  deleteMovieValidation,
};
