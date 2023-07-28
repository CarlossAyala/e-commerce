// const { Cart, CartProduct } = require('../../database/mysql/models');
const CartService = require('./cart.service');

const CartProvider = new CartService();

const addItem = async (req, res, next) => {
  try {
    const quantity = req.body.quantity;
    const customerId = req.auth.id;
    const productId = req.params.id;

    // Get Cart Customer
    const cart = await CartProvider.getCartByCustomerId(customerId);

    // If product already exists then update quantity
    let [cartItem, created] = await CartProvider.findOrCreateItem(
      cart.dataValues.id,
      productId,
      quantity
    );

    if (!created) {
      await CartProvider.updateQuantity(cartItem.dataValues.id, quantity);
      cartItem = await CartProvider.getOneExtended(cartItem.dataValues.id);
    }

    return res.status(200).json(cartItem);
  } catch (error) {
    next(error);
  }
};

const getCart = async (req, res, next) => {
  try {
    // Searching by Customer id
    const cart = await CartProvider.getCartByCustomerId(req.auth.id);
    const products = await CartProvider.getProductsCart(cart.dataValues.id);

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

const removeItem = async (req, res, next) => {
  try {
    await CartProvider.removeItem(req.params.id);

    res.status(200).json({
      message: 'Product removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

const updateQuantity = async (req, res, next) => {
  try {
    const quantity = req.body.quantity;
    await CartProvider.updateQuantity(req.params.id, quantity);

    res.status(200).json({
      message: 'Item updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

const updateVisible = async (req, res, next) => {
  try {
    const item = await CartProvider.getOne(req.params.id);
    await CartProvider.updateVisible(
      item.dataValues.id,
      !item.dataValues.visible
    );

    res.status(200).json({
      message: 'Item updated successfully',
    });
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    const cart = await CartProvider.getCartByCustomerId(req.auth.id);
    await CartProvider.clearCart(cart.dataValues.id);

    res.status(200).json({
      message: 'Cart cleared successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addItem,
  getCart,
  updateQuantity,
  updateVisible,
  removeItem,
  clearCart,
};