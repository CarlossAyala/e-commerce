import { notFound, STATUS_CODES } from "./http-errors.js";

export const catch404AndForward = (_req, _res, next) => {
  next(notFound());
};

// eslint-disable-next-line no-unused-vars
export const handlerError = (err, req, res, next) => {
  const {
    name = "Error",
    message = "Interval server error",
    statusCode = STATUS_CODES.INTERNAL_SERVER_ERROR,
    stack,
  } = err;

  console.log(err);
  res.status(statusCode).json({
    error: name,
    message,
    stack,
  });
};
