const regRouter = require('express').Router();

const { createUser } = require('../controllers/users');
const { createUserValidation } = require('../utils/validationWithJoi');

// Роутинг регистрации пользователя
regRouter.post('/signup', createUserValidation, createUser);

module.exports = regRouter;
