/**
 * Handles the chat
 * @param {import("socket.io").Server} io
 * @param {import("socket.io").Socket} socket
 */
const handler = (io, socket) => {
  socket.on("chat:join", (customerId) => {
    socket.join(customerId);
  });

  socket.on("chat:message:send", (to, message) => {
    io.to(to).emit("chat:message:new", message);
  });
};

module.exports = {
  handler,
};
