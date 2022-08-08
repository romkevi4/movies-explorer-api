const { MESSAGE } = require('../utils/responseInfo');
const NotFoundError = require('../errors/notFoundErr');

module.exports.appNotFound = (req, res, next) => next(new NotFoundError(MESSAGE.PATH_NOT_FOUND));
