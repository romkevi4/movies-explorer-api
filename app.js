require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes/index');

const { limiter } = require('./middlewares/rateLimit');
const { handleErrors } = require('./middlewares/handleErrors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_DB } = require('./config');
const { optionsCors } = require('./utils/optionsCors');

const app = express();

app.use('*', cors(optionsCors));

mongoose.connect(MONGO_DB);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(requestLogger);

app.use(limiter);

app.use(routes);

app.use(errorLogger);

app.use(errors());
app.use(handleErrors);

app.listen(PORT);
