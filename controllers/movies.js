const Movie = require('../models/Movie');

const { STATUS_CODE, MESSAGE } = require('../utils/responseInfo');
const { chooseError } = require('../utils/chooseError');

const ForbiddenError = require('../errors/forbiddenErr');
const NotFoundError = require('../errors/notFoundErr');
const ConflictError = require("../errors/conflictErr");

// Возвращение всех карточек с фильмами
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
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
    trailer,
    nameRU,
    nameEN,
  } = req.body;
  const { _id } = req.user;

  Movie.findOne({ nameEN, nameRU })
    .then((movieSaved) => {
      if (!movieSaved) {
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
          trailer,
          nameRU,
          nameEN,
        })
          .then((movie) => {
            res
              .status(STATUS_CODE.CREATED)
              .send(movie);
          });
      } else {
        throw new ConflictError(MESSAGE.ERROR_DUPLICATE_MOVIE_CARD);
      }
    })
    .catch((err) => chooseError(err, next));
};

// Удаление карточки с фильмом
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie || !movieId) {
        throw new NotFoundError(MESSAGE.CARD_NOT_FOUND);
      } else if (_id === movie.owner.toString()) {
        Movie.findByIdAndDelete(movieId)
          .then(() => {
            res
              .status(STATUS_CODE.OK)
              .send(movie);
          });
      } else {
        throw new ForbiddenError(MESSAGE.ERROR_DELETE_CARD);
      }
    })
    .catch((err) => chooseError(err, next));
};
