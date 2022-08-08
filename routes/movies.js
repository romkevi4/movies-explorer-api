const movieRouter = require('express').Router();

const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidation } = require('../utils/validationWithJoi');
const { deleteMovieValidation } = require('../utils/validationWithJoi');

// Роутинг данных фильмов
movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', createMovieValidation, createMovie);
movieRouter.delete('/movies/:movieId', deleteMovieValidation, deleteMovie);

module.exports = movieRouter;
