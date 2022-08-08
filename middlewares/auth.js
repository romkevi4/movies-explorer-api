const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET, SECRET_KEY } = require('../config');
const { MESSAGE } = require('../utils/responseInfo');
const UnauthorizedError = require('../errors/unauthorizedErr');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(MESSAGE.USER_UNAUTHORIZED));
    return;
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_KEY);
  } catch (err) {
    next(new UnauthorizedError(MESSAGE.USER_UNAUTHORIZED));
    return;
  }

  req.user = payload;

  next();
};
