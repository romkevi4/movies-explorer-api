const authRouter = require('express').Router();

const { login } = require('../controllers/users');
const { loginValidation } = require('../utils/validationWithJoi');

// Роутинг аутентификации пользователя
authRouter.post('/signin', loginValidation, login);

module.exports = authRouter;
