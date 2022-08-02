const routes = require('express').Router();

const { auth } = require('../middlewares/auth');

const regRouter = require('./registration');
const authRouter = require('./authentication');
const usersRouter = require('./users');
const moviesRouter = require('./movies');

// Основные маршруты
routes.use(regRouter);
routes.use(authRouter);

routes.use(auth);

routes.use(usersRouter);
routes.use(moviesRouter);

module.exports = routes;
