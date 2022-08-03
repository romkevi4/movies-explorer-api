const { MESSAGE, MONGO_CODE } = require('./responseInfo');
const ConflictError = require('../errors/conflictErr');
const BadRequestError = require('../errors/badRequestErr');

// Определение ошибки
module.exports.chooseError = (err, next) => {
  if (err.code === MONGO_CODE.ERROR_DUPLICATE) {
    next(new ConflictError(MESSAGE.ERROR_DUPLICATE_EMAIL_USER));
  } else if (err.name === 'ValidationError') {
    next(new BadRequestError(MESSAGE.ERROR_INCORRECT_DATA));
  } else if (err.path === '_id' || err.name === 'CastError') {
    next(new BadRequestError(MESSAGE.ERROR_INCORRECT_ID));
  } else {
    next(err);
  }
};
