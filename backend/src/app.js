const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const { NotFound } = require("./utils/http-errors");
const logger = require("./utils/logger");
const sequelize = require("./db/mysql");
const routes = require("./api/routes");
const { validateEnv } = require("./utils");
const config = require("./config");

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: config.client_url,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));

app.use(routes);

app.use((_req, _res, next) => {
  next(new NotFound());
});

app.use((err, _req, _res, next) => {
  err.status = err.status || 500;
  err.message = err.message || "Internal Server Error";
  next(err);
});
app.use((err, _req, _res, next) => {
  logger.error(err);
  next(err);
});
app.use((err, _req, res, _next) => {
  if (config.node_env === "development") {
    console.log(err);
    res.status(err.status).json({
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(err.status).json({
      message: err.message,
    });
  }
});

const startServer = async () => {
  try {
    console.log("Starting");

    validateEnv(config);
    console.log("Environment validated");

    await sequelize.authenticate();
    console.log("Database connected");

    app.listen(config.port);
    console.log("Server running on port", config.port);
  } catch (error) {
    console.error("Server failed to start", error);
    logger.error(error);
    process.exitCode = 1;
  }
};

startServer();
