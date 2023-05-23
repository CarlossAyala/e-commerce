import { Formater } from '../utils/helpers';

class CartUtils {
  static getItemsQuantity(itemsCart) {
    const initial = 0;

    if (!itemsCart || !itemsCart?.length === 0) return initial;

    const quantity = itemsCart.reduce(
      (accu, curr) => accu + curr.quantity,
      initial
    );

    return quantity;
  }

  static getTotalItem(price, quantity) {
    return Formater.price(price * quantity);
  }

  static getSubTotal(cartItems) {
    const initial = {
      value: 0,
      format: Formater.price(0),
    };
    const visible = { ...initial };
    const hidden = { ...initial };
    const both = { ...initial };

    for (const item of cartItems) {
      const price = +item.product.price;
      const quantity = item.quantity;

      if (item.visible) visible.value += quantity * price;
      else hidden.value += quantity * price;

      both.value += quantity * price;
    }

    visible.format = Formater.price(visible.value);
    hidden.format = Formater.price(hidden.value);
    both.format = Formater.price(both.value);

    return [visible, hidden, both];
  }

  static buttonControlls(productUnits, productStock) {
    const min = productUnits === 1;
    const max = productUnits === productStock;

    return [min, max];
  }
}

export default CartUtils;
