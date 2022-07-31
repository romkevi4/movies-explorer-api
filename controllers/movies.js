const Movie = require('../models/Movie');

const { STATUS_CODE, MESSAGE } = require('../utils/responseInfo');
const { chooseErrorType } = require('../utils/chooseErrorType');

// const BadRequestError = require('../errors/badRequestErr');
const ForbiddenError = require('../errors/forbiddenErr');
const NotFoundError = require('../errors/notFoundErr');

// Возвращение всех карточек с фильмами
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
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
        .send({ data: movie });
    })
    .catch((err) => chooseErrorType(err, next));
    //   if (err.name === 'ValidationError') {
    //     next(new BadRequestError(MESSAGE.ERROR_INCORRECT_DATA));
    //   } else {
    //     next(err);
    //   }
    // });
};

// Удаление карточки с фильмом
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie || !movieId) {
        throw new NotFoundError(MESSAGE.CARD_NOT_FOUND);
      } else if (_id === Movie.owner.toString()) {
        Movie.findByIdAndDelete(movieId)
          .then(() => {
            res
              .status(STATUS_CODE.OK)
              .send({ data: movie });
          });
      } else {
        throw new ForbiddenError(MESSAGE.ERROR_DELETE_CARD);
      }
    })
    .catch((err) => chooseErrorType(err, next));
    //   if (err.path === '_id' || err.name === 'CastError') {
    //     next(new BadRequestError(MESSAGE.ERROR_INCORRECT_ID));
    //   } else {
    //     next(err);
    //   }
    // });
};
