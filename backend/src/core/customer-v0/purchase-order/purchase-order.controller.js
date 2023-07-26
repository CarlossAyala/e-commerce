const PurchaseOrderService = require('./purchase-order.service');

const PurchaseOrderProvider = new PurchaseOrderService();

const getOne = async (req, res, next) => {
  try {
    const resoure = await PurchaseOrderProvider.getOne(req.params.id);

    res.status(200).json(resoure);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const customerId = req.auth.id;
    const resources = await PurchaseOrderProvider.getAll(customerId);

    res.status(200).json(resources);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOne,
  getAll,
};
