const sequelize = require("../../../db/mysql");
const { NotFound } = require("../../../utils/http-errors");

const AddressModel = sequelize.model("Address");

const validateAddressId = async (req, _res, next, addressId) => {
  const { userId } = req.auth;

  try {
    const address = await AddressModel.findByPk(addressId);
    if (!address || address.userId !== userId) {
      throw new NotFound("Address not found");
    }

    req.address = address;
    next();
  } catch (error) {
    next(error);
  }
};

const findAll = async (req, res, next) => {
  const { userId } = req.auth;

  try {
    const addresses = await AddressModel.findAll({
      where: {
        userId,
      },
      order: [["createdAt", "DESC"]],
    });

    res.json(addresses);
  } catch (error) {
    next(error);
  }
};

const findOne = async (req, res, next) => {
  const { address } = req;

  try {
    res.json(address);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  const { userId } = req.auth;
  const { body } = req;

  try {
    const address = await AddressModel.create({
      ...body,
      userId,
    });

    res.json(address);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  const { address } = req;
  const { body } = req;

  try {
    await address.update(body);

    res.json(address);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  const { address } = req;

  try {
    await address.destroy();

    res.json(address);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateAddressId,
  findAll,
  findOne,
  create,
  update,
  remove,
};
