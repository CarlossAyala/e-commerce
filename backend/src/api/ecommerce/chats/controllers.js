const sequelize = require("../../../db/mysql");
const { NotFound } = require("../../../utils/http-errors");

const StoreModel = sequelize.model("Store");
const ChatModel = sequelize.model("Chat");
const MessageModel = sequelize.model("Message");

const validateStoreId = async (req, _res, next, storeId) => {
  try {
    const store = await StoreModel.findByPk(storeId, {
      raw: true,
    });
    if (!store) {
      throw new NotFound("Store not found");
    }

    req.store = store;
    next();
  } catch (error) {
    next(error);
  }
};

const attachChat = async (req, _res, next) => {
  const { userId: customerId } = req.auth;
  const { storeId } = req.params;

  try {
    const [chat] = await ChatModel.findOrCreate({
      where: {
        customerId,
        storeId,
      },
      defaults: {
        customerId,
        storeId,
      },
      raw: true,
    });

    req.chat = chat;

    next();
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  const { userId: customerId } = req.auth;

  try {
    const chats = await ChatModel.findAll({
      where: {
        customerId,
      },
      include: [
        {
          model: MessageModel,
          as: "messages",
          order: [["id", "DESC"]],
          limit: 1,
          required: false,
          separate: true,
        },
        {
          model: StoreModel,
          as: "store",
          required: false,
        },
      ],
    });

    res.json(chats);
  } catch (error) {
    next(error);
  }
};

const findAllMessages = async (req, res, next) => {
  const { chat } = req;

  try {
    const messages = await MessageModel.findAll({
      where: {
        chatId: chat.id,
      },
      order: [["id", "DESC"]],
    });

    res.json(messages);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId: customerId } = req.auth;
  const { chat } = req;
  const { text } = req.body;

  try {
    const message = await MessageModel.create({
      chatId: chat.id,
      customerId,
      text,
    });

    res.json(message);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateStoreId,
  attachChat,
  findAll,
  findAllMessages,
  create,
};
