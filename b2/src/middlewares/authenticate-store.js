const { sequelize } = require("../db/mysql");
const { BadRequest } = require("../utils/http-errors");

const StoreModel = sequelize.model("Store");
const StoreImageModel = sequelize.model("StoreImage");

const authenticateStore = async (req, _res, next) => {
  const { userId } = req.auth;

  try {
    const store = await StoreModel.findOne({
      where: { sellerId: userId },
      include: {
        model: StoreImageModel,
        as: "gallery",
        order: [["order", "ASC"]],
        separate: true,
        required: false,
      },
    });
    if (!store) {
      throw new BadRequest("You are not authorized to perform this action");
    }

    req.store = store;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateStore;
