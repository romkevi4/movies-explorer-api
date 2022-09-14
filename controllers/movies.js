const Movie = require('../models/movie');

const { STATUS_CODE, MESSAGE } = require('../utils/responseInfo');
const { chooseError } = require('../utils/chooseError');

const ForbiddenError = require('../errors/forbiddenErr');
const NotFoundError = require('../errors/notFoundErr');

// Возвращение всех сохранённых пользователем карточек с фильмами
module.exports.getMovies = (req, res, next) => {
  const { _id } = req.user;

  Movie.find({ owner: _id })
    .then((movies) => res.send(movies))
    .catch((err) => chooseError(err, next));
};

// Создание карточки с фильмом
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const { _id } = req.user;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: _id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res
        .status(STATUS_CODE.CREATED)
        .send(movie);
    })
    .catch((err) => chooseError(err, next));
};

// Удаление карточки с фильмом
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  Movie.findById({ _id: movieId })
    .then((movie) => {
      if (!movie || !movieId) {
        throw new NotFoundError(MESSAGE.CARD_NOT_FOUND);
      } else if (userId === movie.owner.toString()) {
        Movie.findByIdAndDelete({ _id: movieId })
          .then((deleteMovie) => {
            res
              .status(STATUS_CODE.OK)
              .send(deleteMovie);
          })
          .catch((err) => chooseError(err, next));
      } else {
        throw new ForbiddenError(MESSAGE.ERROR_DELETE_CARD);
      }
    })
    .catch((err) => chooseError(err, next));
};
