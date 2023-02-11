const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

const config = require('./config');
const router = require('./routes/api.routes');
// const connectAtlas = require('./database');
// const connectdb = require('./database/mysql');
const requestMethodValidator = require('./middlewares/api/request-method.middleware');
const Catch404AndForward = require('./middlewares/api/final.middleware');
const errorHandler = require('./middlewares/api/error.middleware');
const sequelize = require('./database/mysql');
require('./database/mysql/models');

const app = express();
const PORT = config.port;

// Middlewares Configuration
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(requestMethodValidator);
app.use(morgan('dev'));

// Routes
router(app);

// Catch 404 and Forward to Error handler
app.use(Catch404AndForward);

// Error handlers}
app.use(errorHandler);

// Main
(async () => {
  try {
    // databases settings
    // https://sequelize.org/docs/v6/core-concepts/model-basics/#synchronizing-all-models-at-once
    await sequelize.sync();
    console.log('All models were synchronized successfully.');

    // Run server
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
})();
