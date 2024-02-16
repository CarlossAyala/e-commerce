exports.badRequest = (message = "Bad Request") => {
  const error = new Error(message);
  error.statusCode = 400;

  return error;
};
exports.unauthorized = (message = "Unauthorized") => {
  const error = new Error(message);
  error.statusCode = 401;

  return error;
};
exports.paymentRequired = (message = "Payment Required") => {
  const error = new Error(message);
  error.statusCode = 402;

  return error;
};
exports.forbidden = (message = "Forbidden") => {
  const error = new Error(message);
  error.statusCode = 403;

  return error;
};
exports.notFound = (message = "Not Found") => {
  const error = new Error(message);
  error.statusCode = 404;

  return error;
};
exports.methodNotAllowed = (message = "Method Not Allowed") => {
  const error = new Error(message);
  error.statusCode = 405;

  return error;
};
exports.notAcceptable = (message = "Not Acceptable") => {
  const error = new Error(message);
  error.statusCode = 406;

  return error;
};
exports.proxyAuthenticationRequired = (
  message = "Proxy Authentication Required"
) => {
  const error = new Error(message);
  error.statusCode = 407;

  return error;
};
exports.requestTimeOut = (message = "Request Time-out") => {
  const error = new Error(message);
  error.statusCode = 408;

  return error;
};
exports.conflict = (message = "Conflict") => {
  const error = new Error(message);
  error.statusCode = 409;

  return error;
};
exports.resourceGone = (message = "Resource Gone") => {
  const error = new Error(message);
  error.statusCode = 410;

  return error;
};
exports.lengthRequired = (message = "Length Required") => {
  const error = new Error(message);
  error.statusCode = 411;

  return error;
};
exports.preconditionFailed = (message = "Precondition Failed") => {
  const error = new Error(message);
  error.statusCode = 412;

  return error;
};
exports.requestEntityTooLarge = (message = "Request Entity Too Large") => {
  const error = new Error(message);
  error.statusCode = 413;

  return error;
};
exports.requestUriTooLarge = (message = "Request-URI Too Large") => {
  const error = new Error(message);
  error.statusCode = 414;

  return error;
};
exports.unsupportedMediaType = (message = "Unsupported Media Type") => {
  const error = new Error(message);
  error.statusCode = 415;

  return error;
};
exports.requestedRangeNotSatisfiable = (
  message = "Requested Range Not Satisfiable"
) => {
  const error = new Error(message);
  error.statusCode = 416;

  return error;
};
exports.expectationFailed = (message = "Expectation Failed") => {
  const error = new Error(message);
  error.statusCode = 417;

  return error;
};
exports.imATeaPot = (message = "I'm a teapot") => {
  const error = new Error(message);
  error.statusCode = 418;

  return error;
};
exports.unprocessableEntity = (message = "Unprocessable Entity") => {
  const error = new Error(message);
  error.statusCode = 422;

  return error;
};
exports.locked = (message = "Locked") => {
  const error = new Error(message);
  error.statusCode = 423;

  return error;
};
exports.failedDependency = (message = "Failed Dependency") => {
  const error = new Error(message);
  error.statusCode = 424;

  return error;
};
exports.tooEarly = (message = "Too Early") => {
  const error = new Error(message);
  error.statusCode = 425;

  return error;
};
exports.upgradeRequired = (message = "Upgrade Required") => {
  const error = new Error(message);
  error.statusCode = 426;

  return error;
};
exports.preconditionRequired = (message = "Precondition Required") => {
  const error = new Error(message);
  error.statusCode = 428;

  return error;
};
exports.tooManyRequests = (message = "Too Many Requests") => {
  const error = new Error(message);
  error.statusCode = 429;

  return error;
};
exports.requestHeaderFieldsTooLarge = (
  message = "Request Header Fields Too Large"
) => {
  const error = new Error(message);
  error.statusCode = 431;

  return error;
};
exports.unavailableForLegalReasons = (
  message = "Unavailable For Legal Reasons"
) => {
  const error = new Error(message);
  error.statusCode = 451;

  return error;
};
exports.internalServerError = (message = "Internal Server Error") => {
  const error = new Error(message);
  error.statusCode = 500;

  return error;
};
exports.notImplemented = (message = "Not Implemented") => {
  const error = new Error(message);
  error.statusCode = 501;

  return error;
};
exports.badGateway = (message = "Bad Gateway") => {
  const error = new Error(message);
  error.statusCode = 502;

  return error;
};
exports.serviceUnavailable = (message = "Service Unavailable") => {
  const error = new Error(message);
  error.statusCode = 503;

  return error;
};
exports.gatewayTimeOut = (message = "Gateway Time-out") => {
  const error = new Error(message);
  error.statusCode = 504;

  return error;
};
exports.httpVersionNotSupported = (message = "HTTP Version Not Supported") => {
  const error = new Error(message);
  error.statusCode = 505;

  return error;
};
exports.variantAlsoNegotiates = (message = "Variant Also Negotiates") => {
  const error = new Error(message);
  error.statusCode = 506;

  return error;
};
exports.insufficientStorage = (message = "Insufficient Storage") => {
  const error = new Error(message);
  error.statusCode = 507;

  return error;
};
exports.bandwidthLimitExceeded = (message = "Bandwidth Limit Exceeded") => {
  const error = new Error(message);
  error.statusCode = 509;

  return error;
};
exports.notExtended = (message = "Not Extended") => {
  const error = new Error(message);
  error.statusCode = 510;

  return error;
};
exports.networkAuthenticationRequired = (
  message = "Network Authentication Required"
) => {
  const error = new Error(message);
  error.statusCode = 511;

  return error;
};
