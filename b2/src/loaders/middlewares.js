const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

/**
 * @param {import("express").Express} app
 */
module.exports = (app) => {
  console.log("Loading Middlewares");
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
};
