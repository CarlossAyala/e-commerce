const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const routes = require("./routes");
const config = require("./config");
const requestMethodValidator = require("./middlewares/api/request-method.middleware");
const Catch404AndForward = require("./middlewares/api/final.middleware");
const ErrorHandler = require("./middlewares/api/error.middleware");
const { sequelize } = require("./database/mysql");
require("./database/mysql/models");

const app = express();
const PORT = config.port;

app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set("query parser", true);
app.use(requestMethodValidator);
app.use(logger("dev"));

app.use(routes);

app.use(Catch404AndForward);

app.use(ErrorHandler);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync();
    console.log("All models were synchronized successfully.");

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.error(error.message);
  }
})();
