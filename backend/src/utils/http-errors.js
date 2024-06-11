class BadRequest extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.status = 400;
  }
}
class Unauthorized extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.status = 401;
  }
}
class Forbidden extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.status = 403;
  }
}
class NotFound extends Error {
  constructor(message = "Not Found") {
    super(message);
    this.status = 404;
  }
}
class TooManyRequests extends Error {
  constructor(message = "Too Many Requests") {
    super(message);
    this.status = 429;
  }
}
class InternalServerError extends Error {
  constructor(message = "Internal Server Error") {
    super(message);
    this.status = 500;
  }
}

module.exports = {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  TooManyRequests,
  InternalServerError,
};
