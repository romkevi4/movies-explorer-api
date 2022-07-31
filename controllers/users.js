const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const { STATUS_CODE, MESSAGE, SALT_HASH } = require('../utils/responseInfo');
const { chooseErrorType } = require('../utils/chooseErrorType');


// const BadRequestError = require('../errors/badRequestErr');
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
    .catch((err) => chooseErrorType(err, next));
    //   if (err.code === MONGO_CODE.ERROR_DUPLICATE) {
    //     next(new ConflictError(MESSAGE.ERROR_DUPLICATE_EMAIL_USER));
    //   } else if (err.name === 'ValidationError') {
    //     next(new BadRequestError(MESSAGE.ERROR_INCORRECT_DATA));
    //   } else {
    //     next(err);
    //   }
    // });
};

// Авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
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

      res.send({ data: user });
    })
    .catch((err) => chooseErrorType(err, next));
    //   if (err.name === 'ValidationError') {
    //     next(new BadRequestError(MESSAGE.ERROR_INCORRECT_DATA));
    //   } else {
    //     next(err);
    //   }
    // });
};
