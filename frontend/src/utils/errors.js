export class APIError extends Error {
  constructor(name, message, statusCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}

export const AUTH_INVALID_REQUEST = "invalid_request";
export const AUTH_INVALID_TOKEN = "invalid_token";
export const AUTH_INVALID_CLIENT = "invalid_client";
