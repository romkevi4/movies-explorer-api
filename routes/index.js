const routes = require('express').Router();

const { auth } = require('../middlewares/auth');
const { appNotFound } = require('../middlewares/appNotFound');

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

routes.use(appNotFound);

module.exports = routes;
