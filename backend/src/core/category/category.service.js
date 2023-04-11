const { Op } = require('sequelize');
const sequelize = require('../../database/mysql');
const { Category, Product, Business } = require('../../database/mysql/models');

class CategoryService {
  create({ name, available, parentId }) {
    return Category.model.create({
      name,
      available,
      parentId,
    });
  }

  getOne(id) {
    return Category.model.findByPk(id);
  }

  getAll() {
    return Category.model.findAll({
      where: {
        parentId: {
          [Op.is]: null,
        },
      },
      include: {
        model: Category.model,
        as: 'children',
      },
      attributes: {
        exclude: ['parentId'],
      },
    });
  }

  remove(id) {
    return Category.model.destroy({
      where: {
        id,
      },
    });
  }

  update(id, body) {
    return Category.model.update(body, {
      where: {
        id,
      },
    });
  }

  getBestSellers(categoryId) {
    return Product.model.findAll({
      where: {
        categoryId,
      },
      order: [['sold', 'DESC']],
      limit: 10,
    });
  }

  getBestCategories() {
    return Product.model.findAll({
      attributes: [
        'categoryId',
        [sequelize.fn('SUM', sequelize.col('sold')), 'n_ventas'],
      ],
      order: [['n_ventas', 'DESC']],
      group: 'categoryId',
      limit: 6,
      include: {
        model: Category.model,
        as: 'category',
      },
    });
  }

  getBestSubCategories(categoryId) {
    return Product.model.findAll({
      attributes: [
        'categoryId',
        [sequelize.fn('SUM', sequelize.col('sold')), 'n_ventas'],
      ],
      order: [['n_ventas', 'DESC']],
      group: 'categoryId',
      limit: 10,
      include: {
        model: Category.model,
        as: 'category',
        where: {
          parentId: categoryId,
        },
      },
    });
  }

  getBestBrands(categoryId) {
    return Product.model.findAll({
      attributes: [
        'categoryId',
        'businessId',
        [sequelize.fn('SUM', sequelize.col('sold')), 'n_ventas'],
      ],
      where: {
        categoryId,
      },
      order: [['n_ventas', 'DESC']],
      group: 'businessId',
      limit: 10,
      include: {
        model: Business.model,
        as: 'business',
        attributes: {
          exclude: ['userId'],
        },
      },
    });
  }

  existCatBySlug(slug) {
    return Category.model.findOne({
      where: {
        slug,
      },
    });
  }

  getCatBySlugSimple(slug) {
    return Category.model.findOne({
      where: {
        slug,
      },
    });
  }

  getCatBySlugExtend(slug) {
    return Category.model.findOne({
      where: {
        slug,
      },
      include: [
        {
          model: Category.model,
          as: 'parent',
          include: {
            model: Category.model,
            as: 'children',
          },
        },
        {
          model: Category.model,
          as: 'children',
        },
      ],
    });
  }

  getCategoryStores(categoryId) {
    return Product.model.findAll({
      attributes: ['categoryId', 'businessId'],
      where: {
        categoryId,
      },
      group: 'businessId',
      include: {
        model: Business.model,
        as: 'business',
        attributes: {
          exclude: ['userId'],
        },
      },
    });
  }

  getCategoryProducts(productClause, businessClause) {
    return Product.model.findAndCountAll({
      ...productClause,
      include: {
        model: Business.model,
        as: 'business',
        attributes: {
          exclude: ['userId'],
        },
        ...businessClause,
      },
    });
  }
}

module.exports = CategoryService;
