const { STATUS_CODE } = require('./responseInfo');

// Настройка опций для CORS
module.exports.optionsCors = {
  origin: [
    'http://localhost:3000',
    'localhost:3000',
    'https://movies-search.shatskikh.nomoredomains.sbs',
    'http://movies-search.shatskikh.nomoredomains.sbs',
    'https://api.nomoreparties.co/beatfilm-movies',
    'http://api.nomoreparties.co/beatfilm-movies',
  ],
  credentials: true,
  optionsSuccessStatus: STATUS_CODE.OK,
};
