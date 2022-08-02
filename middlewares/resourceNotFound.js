const { MESSAGE } = require('../utils/responseInfo');
const NotFoundError = require('../errors/notFoundErr');

module.exports.resourceNotFound = (req, res, next) => next(new NotFoundError(MESSAGE.PATH_NOT_FOUND));
