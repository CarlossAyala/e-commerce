const sequelize = require("../../../db/mysql");
const { BadRequest } = require("../../../utils/http-errors");

const UserModel = sequelize.model("User");
const ChatModel = sequelize.model("Chat");
const MessageModel = sequelize.model("Message");

const validateChat = async (req, _res, next) => {
  const { store } = req;
  const { chatId } = req.params;

  try {
    const chat = await ChatModel.findOne({
      where: {
        id: chatId,
        storeId: store.id,
      },
      raw: true,
    });
    if (!chat) {
      throw new BadRequest("Chat not found");
    }

    req.chat = chat;
    next();
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  const { store } = req;

  try {
    const chats = await ChatModel.findAll({
      where: {
        storeId: store.id,
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
          model: UserModel,
          as: "customer",
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
  const { store } = req;
  const { chat } = req;
  const { text } = req.body;

  try {
    const message = await MessageModel.create({
      chatId: chat.id,
      storeId: store.id,
      text,
    });

    res.json(message);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateChat,
  findAll,
  findAllMessages,
  create,
};
