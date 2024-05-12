const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const { port, node_env, client_url } = require("./config");
// const {  startDB } = require("./db/mysql");
// const routes = require("./api/routes");
const { NotFound } = require("./utils/http-errors");

const app = express();

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: client_url,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
// TODO: Add logger (ex: winston)

// TODO: Add routes
// app.use(routes);

app.use((_req, _res, next) => {
  next(new NotFound());
});
app.use((err, _req, res, _next) => {
  if (node_env === "development") {
    console.log(err);
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    });
  } else {
    res.status(err.status || 500).json({
      message: err.message,
    });
  }
});

const startServer = async () => {
  try {
    console.log("Starting server...");

    // await checkDBConnection();

    // await startDB();

    app.listen(port);
    console.log("Server running on port", port);
  } catch (error) {
    console.error("Server failed to start", error);
    process.exit(1); // TODO: Try to restart the server
  }
};

startServer();
