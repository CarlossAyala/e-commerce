const express = require('express');
const router = express.Router();
const Boom = require('@hapi/boom');
const slugify = require('slugify');
const { Category, Product, Store } = require('../../../database/mysql/models');
const validatorSchema = require('../../../middlewares/api/validator.middleware');
const JWT = require('../../../middlewares/auth/jwt.auth');
const schemas = require('./product.schema');
const slugifyOptions = require('../../../constant/slugify');
const QueryBuilder = require('../../../utils/database/query-builder');

// Get Products
router.get('/', JWT.verify, async (req, res, next) => {
  const { id: sellerId } = req.auth;
  try {
    const store = await Store.model.findOne({
      where: {
        sellerId,
      },
    });
    if (!store) return next(Boom.notFound('Store not found'));

    const { where, order, limit, offset } = new QueryBuilder(req.query)
      .where('storeId', store.dataValues.id)
      .whereLike('name', req.query.name)
      .orderBy('name', 'ASC')
      .pagination()
      .build();

    const products = await Product.model.findAndCountAll({
      where,
      order,
      limit,
      offset,
    });

    return res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// // Product Get One
// router.get(
//   '/:id',
//   JWT.verify,
//   validatorSchema(schemas.resourceId, 'params'),
//   async (req, res, next) => {
//     try {
//       // middleware userHasStore
//       const store = await Store.model.findOne({
//         where: {
//           userId: req.auth.id,
//         },
//       });

//       if (!store) return next(Boom.notFound('Store not found'));

//       // controller getProduct
//       const product = await Product.model.findOne({
//         where: {
//           id: req.params.id,
//           storeId: store.dataValues.id,
//         },
//         include: {
//           model: Category.model,
//           as: 'category',
//         },
//       });

//       if (!product) return next(Boom.notFound('Product not found'));

//       return res.status(200).json(product);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// // Product Update
// router.put(
//   '/:id',
//   JWT.verify,
//   validatorSchema(schemas.resourceId, 'params'),
//   validatorSchema(schemas.base, 'body'),
//   async (req, res, next) => {
//     try {
//       // middleware userHasStore
//       const store = await Store.model.findOne({
//         where: {
//           userId: req.auth.id,
//         },
//       });
//       if (!store) return next(Boom.notFound('Store not found'));

//       // middleware getProduct
//       const product = await Product.model.findOne({
//         where: {
//           id: req.params.id,
//           storeId: store.dataValues.id,
//         },
//       });
//       if (!product) return next(Boom.notFound('Product not found'));

//       // middleware existCategory
//       const category = await Category.model.findByPk(req.body.categoryId);
//       if (!category) return next(Boom.notFound('Category not found'));

//       // controller updateProduct
//       const updatedProduct = await product.update(req.body);

//       return res.status(200).json(updatedProduct);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// // Product Category Get One
// router.get(
//   '/categories/:id',
//   validatorSchema(schemas.resourceId, 'params'),
//   async (req, res, next) => {
//     try {
//       // controller getCategory
//       const category = await Category.model.findOne({
//         where: {
//           id: req.params.id,
//         },
//       });

//       if (!category) return next(Boom.notFound('Category not found'));

//       return res.status(200).json(category);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// // Product Publish
// router.post(
//   '/publish',
//   JWT.verify,
//   validatorSchema(schemas.base, 'body'),
//   // middleware userHasStore
//   async (req, res, next) => {
//     try {
//       const store = await Store.model.findOne({
//         where: {
//           userId: req.auth.id,
//         },
//       });

//       if (!store) return next(Boom.notFound('Store not found'));

//       next();
//     } catch (error) {
//       next(error);
//     }
//   },
//   // middleware existCategory
//   async (req, res, next) => {
//     const { categoryId } = req.body;

//     try {
//       const resource = await Category.model.findByPk(categoryId);

//       if (!resource) return next(Boom.notFound('Category not found'));

//       next();
//     } catch (error) {
//       next(error);
//     }
//   },
//   // controller publishProduct
//   async (req, res, next) => {
//     try {
//       const store = await Store.model.findOne({
//         where: {
//           userId: req.auth.id,
//         },
//       });

//       const newProduct = await Product.model.create({
//         ...req.body,
//         slug: slugify(req.body.name, slugifyOptions),
//         storeId: store.dataValues.id,
//       });

//       return res.status(200).json(newProduct.dataValues);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

// // Product Delete
// router.delete(
//   '/:id',
//   JWT.verify,
//   validatorSchema(schemas.resourceId, 'params'),
//   // middleware isStoreOwner
//   async (req, res, next) => {
//     try {
//       const store = await Store.model.findOne({
//         where: {
//           userId: req.auth.id,
//         },
//       });

//       if (!store) return next(Boom.notFound('Store not found'));

//       const product = await Product.model.findByPk(req.params.id);

//       if (!product) return next(Boom.notFound('Product not found'));

//       if (product.dataValues.storeId !== store.dataValues.id) {
//         return next(Boom.unauthorized('You are not the owner of this store'));
//       }

//       next();
//     } catch (error) {
//       next(error);
//     }
//   },
//   // controller deleteProduct
//   async (req, res, next) => {
//     try {
//       await Product.model.destroy({
//         where: {
//           id: req.params.id,
//         },
//       });

//       return res.status(200).json({ message: 'Product deleted' });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

module.exports = router;
