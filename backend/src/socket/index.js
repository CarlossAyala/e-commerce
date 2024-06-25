const chat = require("./chat");

/**
 * Initializes the socket connection
 *
 * @param {import("socket.io").Server} io
 */
const initialize = (io) => {
  io.on("connection", (socket) => {
    chat.handler(io, socket);

    socket.on("disconnect", () => {});
  });
};

module.exports = {
  initialize,
};
