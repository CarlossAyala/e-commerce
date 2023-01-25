const {
  Product,
  PurchaseOrder,
  OrderItem,
  OrderAddress,
  CardRegister,
} = require('../../database/mysql/models');

class PurchaseOrderService {
  getOne(id) {
    return PurchaseOrder.model.findByPk(id, {
      attributes: {
        exclude: ['fkCardPayment', 'fkCustomer'],
      },
      include: [
        {
          model: OrderItem.model,
          as: 'products',
          attributes: {
            exclude: ['fkOrder', 'fkProduct'],
          },
          include: {
            model: Product.model,
            as: 'details',
            // Aquí hiría el IMG del producto
            attributes: ['id'],
          },
        },
        {
          model: OrderAddress.model,
          as: 'destination',
          attributes: {
            exclude: ['fkOrder'],
          },
        },
        {
          model: CardRegister.model,
          as: 'creditCard',
        },
      ],
    });
  }

  getAll(id) {
    return PurchaseOrder.model.findAll({
      where: {
        fkCustomer: id,
      },
    });
  }
}

module.exports = PurchaseOrderService;
