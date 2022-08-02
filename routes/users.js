const userRouter = require('express').Router();

const { getUserData, updateUserData } = require('../controllers/users');
const { updateUserDataValidation } = require('../utils/validationWithJoi');


// Роутинг данных пользователя
userRouter.get('/users/me', getUserData);
userRouter.patch('/users/me', updateUserDataValidation, updateUserData);

module.exports = userRouter;
