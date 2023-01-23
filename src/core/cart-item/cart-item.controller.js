const CartItemService = require('./cart-item.service');

const CartItemProvider = new CartItemService();

const addProduct = async (req, res, next) => {
  try {
    const quantity = req.body.quantity;
    const fkCustomer = req.auth.id;
    const fkProduct = req.params.productId;

    await CartItemProvider.addProduct({
      quantity,
      fkCustomer,
      fkProduct,
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
    const resoure = await CartItemProvider.getCart(req.auth.id);

    res.status(200).json(resoure);
  } catch (error) {
    next(error);
  }
};

const removeProduct = async (req, res, next) => {
  try {
    await CartItemProvider.remove(req.params.id);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const quantity = req.body.quantity;
    await CartItemProvider.update(req.params.id, quantity);

    res.status(200).end();
  } catch (error) {
    next(error);
  }
};

const clearCart = async (req, res, next) => {
  try {
    await CartItemProvider.clearCart(req.auth.id);

    res.status(200).end();
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
