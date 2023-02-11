const { Op } = require('sequelize');
const { Category } = require('../../database/mysql/models');

class CategoryService {
  async create({ name, available, parentId }) {
    return await Category.model.create({
      name,
      available,
      parentId,
    });
  }

  async getOne(id) {
    return await Category.model.findByPk(id);
  }

  async getAll() {
    return await Category.model.findAll({
      where: {
        parentId: {
          [Op.is]: null,
        },
      },
      include: [
        {
          model: Category.model,
          as: 'subCats',
          attributes: {
            exclude: ['parentId'],
          },
          include: [
            {
              model: Category.model,
              as: 'subCats',
              attributes: {
                exclude: ['parentId'],
              },
              include: [
                {
                  model: Category.model,
                  as: 'subCats',
                  attributes: {
                    exclude: ['parentId'],
                  },
                },
              ],
            },
          ],
        },
      ],
    });
  }

  async remove(id) {
    return Category.model.destroy({
      where: {
        id,
      },
    });
  }

  async update(id, body) {
    return Category.model.update(body, {
      where: {
        id,
      },
    });
  }
}

module.exports = CategoryService;
