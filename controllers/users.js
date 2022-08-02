const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET, SECRET_KEY } = require('../config');

const { STATUS_CODE, MESSAGE, SALT_HASH } = require('../utils/responseInfo');
const { chooseError } = require('../utils/chooseError');

const UnauthorizedError = require('../errors/unauthorizedErr');
const NotFoundError = require('../errors/notFoundErr');
const ConflictError = require('../errors/conflictErr');

// Получение данных о пользователе
module.exports.getUserData = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE.USER_NOT_FOUND);
      }

      res.send(user);
    })
    .catch(next);
};

// Создание пользователя
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then((userSaved) => {
      if (!userSaved) {
        bcrypt.hash(password, SALT_HASH.ROUNDS)
          .then((hash) => User.create({
            name,
            email,
            password: hash,
          }))
          .then((user) => {
            res
              .status(STATUS_CODE.CREATED)
              .send({
                name: user.name,
                email: user.email,
                _id: user._id,
              });
          });
      } else {
        throw new ConflictError(MESSAGE.ERROR_DUPLICATE_EMAIL_USER);
      }
    })
    .catch((err) => chooseError(err, next));
};

// Авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY,
        { expiresIn: '7d' },
      );

      if (!token) {
        throw new UnauthorizedError(MESSAGE.DATA_UNAUTHORIZED);
      }

      res.send({ token });
    })
    .catch(next);
};

// Обновление профиля
module.exports.updateUserData = (req, res, next) => {
  const { name, email } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(MESSAGE.USER_NOT_FOUND);
      }

      res.send(user);
    })
    .catch((err) => chooseError(err, next));
};
