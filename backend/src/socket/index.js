const sequelize = require("../db/mysql");
const { verifyAccessToken } = require("../utils/jwt");
const chat = require("./chat");

const UserModel = sequelize.model("User");
const StoreModel = sequelize.model("Store");

/**
 * Validates the socket token
 *
 * @param {import("socket.io").Socket} socket
 * @param {function(): void} next
 */
const validateJWT = async (socket, next) => {
  const isHandshake = socket.handshake.query?.sid === undefined;
  if (!isHandshake) {
    return next();
  }

  const accessToken = socket.handshake?.auth?.accessToken;
  if (!accessToken) {
    return next(new Error("No access token provided"));
  }

  try {
    const { userId } = verifyAccessToken(accessToken);
    const user = await UserModel.findByPk(userId, { raw: true });
    if (!user) {
      return next(new Error("You are not authorized to access this resource"));
    }
    socket.auth = { userId };

    next();
  } catch (_) {
    next(new Error("Invalid access token"));
  }
};

/**
 * Attaches the store to the socket if needed
 *
 * @param {import("socket.io").Socket} socket
 * @param {function(): void} next
 */
const attachStore = async (socket, next) => {
  const { userId } = socket.auth;
  const entity = socket.handshake.auth?.entity;

  try {
    if (entity === "seller") {
      const store = await StoreModel.findOne({
        where: {
          userId,
        },
        raw: true,
      });
      if (!store) {
        return next(
          new Error("You are not authorized to access this resource"),
        );
      }
      socket.auth = { ...socket.auth, store };
    }

    next();
  } catch (_error) {
    next("Error attaching store to socket");
  }
};

/**
 * Joins the client to the store or user room
 *
 * @param {import("socket.io").Socket} socket
 * @param {function(): void} next
 */
const clientJoinRoom = (socket, next) => {
  const { userId, store } = socket.auth;
  const storeId = store?.id;
  const { entity } = socket.handshake.auth;

  if (entity === "seller") socket.join(storeId);
  else socket.join(userId);

  next();
};

/**
 * Leaves the client from the store or user room
 *
 * @param {import("socket.io").Socket} socket
 */
const clientLeaveRoom = (socket) => {
  const { userId, store } = socket.auth;
  const storeId = store?.id;
  const { entity } = socket.handshake.auth;

  if (entity === "seller") socket.leave(storeId);
  else socket.leave(userId);
};

/**
 * Initializes the socket connection
 *
 * @param {import("socket.io").Server} io
 */
const initialize = (io) => {
  io.use(validateJWT);
  io.use(attachStore);

  io.on("connection", (socket) => {
    io.use(clientJoinRoom);

    chat.handler(io, socket);

    socket.on("disconnect", () => clientLeaveRoom(socket));
  });
};

module.exports = {
  initialize,
};
