/**
 * Handles the chat
 * @param {import("socket.io").Server} io
 * @param {import("socket.io").Socket} socket
 */
const handler = (io, socket) => {
  socket.on("chat:message:send", (message) => {
    io.to(message.customerId)
      .to(message.storeId)
      .emit("chat:message:new", message);
  });
};

module.exports = {
  handler,
};
