const { Product } = require('../../database/mysql/models');

class ProductService {
  create({
    name,
    description,
    stock,
    sold,
    price,
    available,
    condition,
    categoryId,
    businessId,
  }) {
    return Product.model.create({
      name,
      description,
      stock,
      sold,
      price,
      available,
      condition,
      categoryId,
      businessId,
    });
  }

  getOne(id) {
    return Product.model.findByPk(id);
  }

  getAll() {
    return Product.model.findAll({
      limit: 20,
    });
  }

  update(id, body) {
    const {
      name,
      description,
      stock,
      sold,
      price,
      available,
      condition,
      categoryId,
    } = body;
    return Product.model.update(
      {
        name,
        description,
        stock,
        sold,
        price,
        available,
        condition,
        categoryId,
      },
      {
        where: {
          id,
        },
      }
    );
  }

  remove(id) {
    return Product.model.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = ProductService;
