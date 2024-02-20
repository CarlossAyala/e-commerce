const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const schemas = require("./category.schema");
const { Op } = require("sequelize");
const {
  JWT,
  validateSchema,
  authentication,
} = require("../../../middlewares/");
const { Category, Product } = require("../../../database/mysql/models");
const { slugify } = require("../../../libs");
const sequelize = require("../../../database/mysql/connection");

router.get("/mixed", JWT.verify, authentication, async (req, res, next) => {
  const { main, single } = Category.enums.type;

  try {
    const categories = await Category.model.findAll({
      where: {
        [Op.or]: [{ type: main }, { type: single }],
      },
      include: {
        model: Category.model,
        as: "children",
        separate: true,
        order: [["name", "ASC"]],
      },
      order: [["name", "ASC"]],
    });

    return res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:id",
  JWT.verify,
  authentication,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: categoryId } = req.params;

    try {
      const category = await Category.model.findByPk(categoryId, {
        include: [
          {
            model: Category.model,
            as: "parent",
            include: {
              model: Category.model,
              as: "children",
              separate: true,
              order: [["name", "ASC"]],
            },
          },
          {
            model: Category.model,
            as: "children",
            separate: true,
            order: [["name", "ASC"]],
          },
        ],
      });
      if (!category) {
        throw Boom.badRequest("Category not found");
      }

      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

// Create
router.post(
  "/",
  JWT.verify,
  authentication,
  validateSchema(schemas.create, "body"),
  async (req, res, next) => {
    const { name, description, type } = req.body;

    const slug = slugify(name);

    try {
      const categoryExist = await Category.model.findOne({
        where: {
          slug,
        },
      });
      if (categoryExist) {
        throw Boom.badRequest("Category name already exists");
      }

      const category = await Category.model.create({
        name,
        description,
        slug,
        type,
      });

      return res.status(201).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/attach",
  JWT.verify,
  authentication,
  validateSchema(schemas.attach, "body"),
  async (req, res, next) => {
    const { categoryId, categoriesId } = req.body;

    try {
      const category = await Category.model.findByPk(categoryId);
      if (!category) {
        throw Boom.badRequest("Category not found");
      } else if (category.type !== Category.enums.type.main) {
        throw Boom.badRequest("Category need be a main category");
      }

      const categories = await Category.model.findAll({
        where: {
          id: {
            [Op.in]: categoriesId,
          },
        },
      });

      const validCategories = categories.map(async (category) => {
        if (category.type === Category.enums.type.main) {
          throw Boom.badRequest("Category need be a sub or single category");
        }
      });
      await Promise.all(validCategories);

      await sequelize.transaction(async (t) => {
        await Category.model.update(
          {
            parentId: categoryId,
            type: Category.enums.type.sub,
          },
          {
            where: {
              id: {
                [Op.in]: categoriesId,
              },
            },
            transaction: t,
          }
        );
      });

      return res
        .status(200)
        .json({ message: "Category attached successfully" });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/detach",
  JWT.verify,
  authentication,
  validateSchema(schemas.detach, "body"),
  async (req, res, next) => {
    const { categoryId, categoriesId } = req.body;

    try {
      const category = await Category.model.findByPk(categoryId);
      if (!category) {
        throw Boom.badRequest("Category not found");
      } else if (category.type !== Category.enums.type.main) {
        throw Boom.badRequest("Category need be a main category");
      }

      const categories = await Category.model.findAll({
        where: {
          id: {
            [Op.in]: categoriesId,
          },
        },
      });

      for (const category of categories) {
        if (
          category.type !== Category.enums.type.sub ||
          category.parentId !== categoryId
        ) {
          throw Boom.badRequest("Category need be a sub category");
        }
      }

      await sequelize.transaction(async (t) => {
        await Product.model.update(
          { categoryId: null, available: false },
          {
            where: {
              categoryId: {
                [Op.in]: categoriesId,
              },
            },
            transaction: t,
          }
        );

        await Category.model.update(
          {
            type: Category.enums.type.single,
            parentId: null,
          },
          {
            where: {
              id: {
                [Op.in]: categoriesId,
              },
            },
            transaction: t,
          }
        );
      });

      return res
        .status(200)
        .json({ message: "Categories detached successfully" });
    } catch (error) {
      next(error);
    }
  }
);

// update
router.patch(
  "/:id",
  JWT.verify,
  authentication,
  validateSchema(schemas.resourceId, "params"),
  validateSchema(schemas.update, "body"),
  async (req, res, next) => {
    const { id: categoryId } = req.params;
    const { name, description } = req.body;
    const slug = slugify(name);

    try {
      const category = await Category.model.findByPk(categoryId);
      if (!category) {
        throw Boom.badRequest("Category not found");
      } else if (category.slug !== slug) {
        const categoryExist = await Category.model.findOne({
          where: {
            slug,
          },
        });
        if (categoryExist) {
          throw Boom.badRequest("Category name already exists");
        }
      }

      await category.update({ name, description, slug });

      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  JWT.verify,
  validateSchema(schemas.resourceId, "params"),
  async (req, res, next) => {
    const { id: categoryId } = req.params;

    try {
      const category = await Category.model.findByPk(categoryId);
      if (!category) {
        throw Boom.badRequest("Category not found");
      }

      const { type } = category.dataValues;
      const { main, sub } = Category.enums.type;

      await sequelize.transaction(async (t) => {
        if (type === main) {
          const subCategories = await Category.model.findAll({
            where: {
              parentId: categoryId,
            },
          });
          if (subCategories.length > 0) {
            throw Boom.badRequest("Category need be empty");
          }

          await Product.model.update(
            { categoryId: null, available: false },
            { where: { categoryId }, transaction: t }
          );

          await category.destroy({ transaction: t });
        } else if (type === sub) {
          await Product.model.update(
            { categoryId: null, available: false },
            { where: { categoryId }, transaction: t }
          );

          await category.destroy({ transaction: t });
        } else {
          await category.destroy({ transaction: t });
        }
      });

      return res.status(200).json({
        message: "Category deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
