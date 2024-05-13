class HttpError extends Error {
  constructor(name, message, statusCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export const STATUS_CODES = {
  BAD_REQUEST: 400,
  INTERNAL_SERVER_ERROR: 500,
};

export const badRequest = (message = "Bad Request") => {
  return new HttpError("bad_request", message, 400);
};
export const unauthorized = (message = "Unauthorized") => {
  return new HttpError("unauthorized", message, 401);
};
export const paymentRequired = (message = "Payment Required") => {
  return new HttpError("payment_required", message, 402);
};
export const forbidden = (message = "Forbidden") => {
  return new HttpError("forbidden", message, 403);
};
export const notFound = (message = "Not Found") => {
  return new HttpError("not_found", message, 404);
};
export const methodNotAllowed = (message = "Method Not Allowed") => {
  return new HttpError("method_not_allowed", message, 405);
};
export const notAcceptable = (message = "Not Acceptable") => {
  return new HttpError("not_acceptable", message, 406);
};
export const unsupportedMediaType = (message = "Unsupported Media Type") => {
  return new HttpError("unsupported_media_type", message, 415);
};
export const imATeaPot = (message = "I'm a teapot") => {
  return new HttpError("im_a_teapot", message, 418);
};
export const tooManyRequests = (message = "Too Many Requests") => {
  return new HttpError("too_many_requests", message, 429);
};
export const internalServerError = (message = "Internal Server Error") => {
  return new HttpError("internal_server_error", message, 500);
};
export const notImplemented = (message = "Not Implemented") => {
  return new HttpError("not_implemented", message, 501);
};
export const badGateway = (message = "Bad Gateway") => {
  return new HttpError("bad_gateway", message, 502);
};

// Tokens
// https://www.rfc-editor.org/rfc/rfc6750#section-3.1
export const invalidRequest = (message = "Invalid Request") => {
  return new HttpError("invalid_request", message, 400);
};
export const invalidToken = (message = "Invalid Token") => {
  return new HttpError("invalid_token", message, 401);
};
// https://www.rfc-editor.org/rfc/rfc6749#section-5.2
export const invalidClient = (message = "Invalid Client") => {
  return new HttpError("invalid_client", message, 401);
};
