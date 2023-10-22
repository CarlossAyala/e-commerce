const express = require("express");
const router = express.Router();
const Boom = require("@hapi/boom");
const { Sequelize, Op } = require("sequelize");
const {
  Category,
  Product,
  Review,
  Store,
} = require("../../../database/mysql/models");

router.get("/main", async (req, res, next) => {
  try {
    const categories = await Category.model.findAll({
      where: {
        type: Category.enums.type.main,
      },
      order: [["name", "ASC"]],
    });

    return res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get("/full", async (req, res, next) => {
  try {
    const categories = await Category.model.findAll({
      where: {
        type: Category.enums.type.main,
      },
      include: {
        model: Category.model,
        as: "children",
        separate: true,
        order: [["name", "ASC"]],
      },
      order: [["name", "ASC"]],
    });

    return res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  const { slug } = req.params;

  try {
    const category = await Category.model.findOne({
      where: {
        slug,
      },
    });
    if (!category) throw Boom.notFound("Category not found");
    else if (!category.available) {
      throw Boom.notFound("Category not available");
    }

    return res.json(category);
  } catch (error) {
    next(error);
  }
});

router.get("/:slug/list", async (req, res, next) => {
  const { slug } = req.params;

  try {
    const category = await Category.model.findOne({
      where: {
        slug,
      },
    });
    if (!category) throw Boom.notFound("Category not found");
    else if (!category.available) {
      throw Boom.notFound("Category not available");
    }

    let categories;
    if (category.dataValues.type === Category.enums.type.main) {
      categories = await Category.model.findAll({
        where: {
          id: category.dataValues.id,
          type: Category.enums.type.main,
        },
        include: {
          model: Category.model,
          as: "children",
          separate: true,
          order: [["name", "ASC"]],
        },
      });
    } else {
      categories = await Category.model.findAll({
        where: {
          id: category.dataValues.parentId,
          type: Category.enums.type.main,
        },
        include: {
          model: Category.model,
          as: "children",
          separate: true,
          order: [["name", "ASC"]],
        },
      });
    }

    const [categoryList] = categories;

    return res.json(categoryList);
  } catch (error) {
    next(error);
  }
});

router.get("/:slug/products/best-sellers", async (req, res, next) => {
  const { slug } = req.params;

  try {
    const category = await Category.model.findOne({
      where: {
        slug,
      },
    });
    if (!category) throw Boom.notFound("Category not found");
    else if (!category.available) {
      throw Boom.notFound("Category not available");
    }

    const products = await Product.model.findAll({
      where: {
        categoryId: category.id,
        stock: {
          [Op.gt]: 0,
        },
        available: true,
      },
      order: [["sold", "DESC"]],
      limit: 10,
      offset: 0,
    });

    return res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:slug/products/top-rated", async (req, res, next) => {
  const { slug } = req.params;

  try {
    const category = await Category.model.findOne({
      where: {
        slug,
      },
    });
    if (!category) throw Boom.notFound("Category not found");
    else if (!category.available) {
      throw Boom.notFound("Category not available");
    }

    const reviews = await Review.model.findAll({
      attributes: [
        "productId",
        [Sequelize.fn("AVG", Sequelize.col("rating")), "average"],
        [Sequelize.fn("COUNT", Sequelize.col("Review.id")), "count"],
      ],
      include: {
        model: Product.model,
        as: "product",
        where: {
          categoryId: category.id,
          stock: {
            [Op.gt]: 0,
          },
          available: true,
        },
        required: true,
      },
      group: ["productId"],
      order: [
        ["count", "DESC"],
        ["average", "DESC"],
        [
          {
            model: Product.model,
            as: "product",
          },
          "sold",
          "DESC",
        ],
      ],
      limit: 10,
      offset: 0,
    });

    for (const review of reviews) {
      review.dataValues.average = Number(review.dataValues.average).toFixed(2);
    }

    return res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.get("/:slug/products/randoms", async (req, res, next) => {
  const { slug } = req.params;

  try {
    const category = await Category.model.findOne({
      where: {
        slug,
      },
    });
    if (!category) throw Boom.notFound("Category not found");
    else if (!category.available) {
      throw Boom.notFound("Category not available");
    }

    const products = await Product.model.findAll({
      where: {
        categoryId: category.id,
        stock: {
          [Op.gt]: 0,
        },
        available: true,
      },
      order: Sequelize.literal("RAND()"),
      limit: 10,
      offset: 0,
    });

    return res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:slug/stores", async (req, res, next) => {
  const { slug } = req.params;

  try {
    const category = await Category.model.findOne({
      where: {
        slug,
      },
    });
    if (!category) throw Boom.notFound("Category not found");
    else if (!category.available) {
      throw Boom.notFound("Category not available");
    }

    const stores = await Store.model.findAll({
      attributes: {
        exclude: ["userId"],
      },
      include: {
        model: Product.model,
        as: "products",
        where: {
          categoryId: category.dataValues.id,
        },
        attributes: [],
      },
      order: Sequelize.literal("RAND()"),
      limit: 10,
      offset: 0,
    });

    return res.json(stores);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
