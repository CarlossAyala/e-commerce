const { createLogger, format, transports } = require("winston");
require("winston-daily-rotate-file");

const { combine, timestamp, json, errors } = format;

const logger = createLogger({
  level: "debug",
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new transports.DailyRotateFile({
      filename: "logs/error-%DATE%.log",
      datePattern: "DD-MM-YYYY",
      level: "error",
      maxFiles: "30d",
    }),
    new transports.DailyRotateFile({
      filename: "logs/combined-%DATE%.log",
      datePattern: "DD-MM-YYYY",
      maxFiles: "30d",
    }),
  ],
});

module.exports = logger;
