const Boom = require('@hapi/boom');
const PurchaseOrderService = require('./purchase-order.service');

const PurchaseOrderProvider = new PurchaseOrderService();

const resourceExist = async (req, res, next) => {
  try {
    const resourceId = req.params.id;
    const resource = await PurchaseOrderProvider.getOne(resourceId);

    if (!resource) return next(Boom.notFound('Purchase Order not found'));

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  resourceExist,
};
