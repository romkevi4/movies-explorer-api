const PORT_DEFAULT = 3000;
const PORT = process.env.PORT || PORT_DEFAULT;

const MONGO_DB_DEFAULT = 'mongodb://localhost:27017/moviesdb';
const MONGO_DB = process.env.MONGODB || MONGO_DB_DEFAULT;

const { NODE_ENV, JWT_SECRET } = process.env;
const SECRET_KEY = 'some-secret-key';

module.exports = {
  PORT,
  MONGO_DB,
  NODE_ENV,
  JWT_SECRET,
  SECRET_KEY,
};
