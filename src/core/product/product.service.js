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
    fkCategory,
    fkBusiness,
  }) {
    return Product.model.create({
      name,
      description,
      stock,
      sold,
      price,
      available,
      condition,
      fkCategory,
      fkBusiness,
    });
  }

  getOne(id) {
    return Product.model.findByPk(id);
  }

  getAll() {
    return Product.model.findAll();
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
      fkCategory,
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
        fkCategory,
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
