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

  getOneExtended(id) {
    return Category.model.findByPk(id, {
      include: [
        { model: Category.model, as: 'parent' },
        { model: Category.model, as: 'children' },
      ],
    });
  }

  getSubCatByParentId(catId, subCat) {
    return Category.model.findOne({
      where: {
        slug: subCat,
        parentId: catId,
      },
    });
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
      limit: 5,
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
      limit: 6,
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
      limit: 5,
      include: {
        model: Business.model,
        as: 'business',
        attributes: {
          exclude: ['userId'],
        },
      },
    });
  }

  // News
  getCatBySlug(slug) {
    return Category.model.findOne({
      where: {
        slug,
      },
    });
  }

  getParentCatBySlug(slug) {
    return Category.model.findOne({
      where: {
        slug,
        parentId: {
          [Op.is]: null,
        },
      },
    });
  }

  getChildrenCatBySlug(slug) {
    return Category.model.findOne({
      where: {
        slug,
        parentId: {
          [Op.not]: null,
        },
      },
    });
  }

  getInfoParentCat(slug) {
    return Category.model.findOne({
      where: {
        slug,
        parentId: {
          [Op.is]: null,
        },
      },
      include: {
        model: Category.model,
        as: 'children',
      },
    });
  }
}

module.exports = CategoryService;
