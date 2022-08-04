const rateLimit = require('express-rate-limit');

const { MESSAGE } = require('../utils/responseInfo');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: MESSAGE.REQUEST_LIMIT,
});
