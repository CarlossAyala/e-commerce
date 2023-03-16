const { CartItem } = require('../../database/mysql/models');
const CartItemService = require('./cart.service');

const CartItemProvider = new CartItemService();

const addProduct = async (req, res, next) => {
  try {
    const quantity = req.body.quantity;
    const customerId = req.auth.id;
    const productId = req.params.productId;

    // If product already exists then update quantity
    const productExist = await CartItem.model.findOne({
      where: {
        productId,
        customerId,
      },
    });

    if (productExist) {
      const cartId = productExist.id;
      await CartItemProvider.updateProduct(cartId, quantity);
      res.status(201).json({
        message: 'Cart Item updated successfully',
      });
      return;
    }

    await CartItemProvider.addProduct({
      quantity,
      customerId,
      productId,
    });

    res.status(201).json({
      message: 'New Cart Item added successfully',
    });
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    // Searching by Customer id
    const [resource] = await CartItemProvider.getCart(req.auth.id);

    const { cart } = resource;

    res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    await CartItemProvider.removeProduct(req.params.id);

    res.status(200).json({
      message: 'Product removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const quantity = req.body.quantity;
    await CartItemProvider.updateProduct(req.params.id, quantity);

    res.status(200).json({
      message: 'Product updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    await CartItemProvider.clearCart(req.auth.id);

    res.status(200).json({
      message: 'Cart cleared successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  getCart,
  updateProduct,
  removeProduct,
  clearCart,
};
