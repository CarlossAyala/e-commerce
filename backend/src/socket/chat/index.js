/**
 * Handles the chat
 * @param {import("socket.io").Server} io
 * @param {import("socket.io").Socket} socket
 */
const handler = (io, socket) => {
  socket.on("chat:message:send", (message) => {
    const { userId, store } = socket.auth;

    const from = message.sender === "customer" ? userId : store.id;
    const to =
      message.sender === "customer" ? message.storeId : message.customerId;

    io.to(from).to(to).emit("chat:message:new", message);
  });
};

module.exports = {
  handler,
};
