import { useState, useEffect, createContext, useContext } from 'react';
import { useAuth } from '../auth';
import * as Cart from '.';
import { Formater } from '../utils/helpers';

const CartContext = createContext({});
export const useCart = () => useContext(CartContext);

export const Provider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const [jwt, user] = useAuth();

  const getCart = async () => {
    try {
      const data = await Cart.API.getItemsCart(jwt);

      // Add Visible properties
      Cart.Helper.addVisibleProperty(data);
      // console.log('Provider', data);

      setCart(data);
    } catch (error) {
      console.log('Cart Provider', error);
    }
  };

  useEffect(() => {
    if (!user) return;
    getCart();
  }, [user]);

  const addItem = async () => {};
  const removeItem = async () => {};
  const updateItem = async (item, quantity) => {
    try {
      await Cart.API.updateItem(jwt, item.id, { quantity });
      setCart((current) =>
        current.map((c) => {
          if (c.id === item.id) c.quantity = quantity;
          return c;
        })
      );
    } catch (error) {
      console.log('Cart Provider', error);
    }
  };
  const visibleToggle = ({ id, visible }) => {
    setCart((curr) =>
      curr.map((item) => {
        if (item.id === id) {
          item.visible = !visible;
        }
        return item;
      })
    );
  };
  const clearCart = async () => {};

  /**
   * Calculates the subtotals of the items in the shopping cart.
   * @returns {Array<object>} Return formated price values for [visible, hidden, both] cart items
   */
  const subTotals = () => {
    const initial = {
      value: 0,
      format: Formater.price(),
    };
    const visible = { ...initial };
    const hidden = { ...initial };
    const both = { ...initial };

    if (!cart || cart.length === 0) {
      return [visible, hidden, both];
    }

    for (const item of cart) {
      if (item.visible) visible.value += item.quantity * +item.product.price;
      else hidden.value += item.quantity * +item.product.price;

      both.value += item.quantity * +item.product.price;
    }

    visible.format = Formater.price(visible.value);
    hidden.format = Formater.price(hidden.value);
    both.format = Formater.price(both.value);

    return [visible, hidden, both];
  };
  const totalProduct = (item) => {
    return Formater.price(item.quantity * +item.product.price);
  };
  const stateControlls = (item, unit) => {
    const min = unit === 1;
    const max = unit === item.product.stock;

    return [min, max];
  };
  const totalItems = () => {
    const initial = 0;

    if (!cart || cart?.length === 0) return 0;

    const items = cart.reduce((accu, curr) => accu + curr.quantity, initial);

    return items;
  };

  const value = [
    cart,
    {
      setCart,
      addItem,
      removeItem,
      updateItem,
      visibleToggle,
      clearCart,
      subTotals,
      totalProduct,
      stateControlls,
      totalItems,
    },
  ];

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
