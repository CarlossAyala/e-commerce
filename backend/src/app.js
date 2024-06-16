const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const { NotFound } = require("./utils/http-errors");
const sequelize = require("./db/mysql");
const routes = require("./api/routes");
const { port, node_env, client_url } = require("./config");
const logger = require("./utils/logger");

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: client_url,
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
app.use((err, _req, res, _next) => {
  logger.error(err);
  if (node_env === "development") {
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

    await sequelize.authenticate();
    console.log("Database connected");

    app.listen(port);
    console.log("Server running on port", port);
  } catch (error) {
    console.error("Server failed to start", error);
    logger.error(error);
    process.exitCode = 1;
  }
};

startServer();
