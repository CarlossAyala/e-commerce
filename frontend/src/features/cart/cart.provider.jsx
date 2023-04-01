import { useState, useEffect, createContext, useContext } from 'react';
import { useAuth } from '../auth';
import { API } from '.';
import { Formater } from '../utils/helpers';

const CartContext = createContext({});
export const useCartContext = () => useContext(CartContext);

export const Provider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const [jwt, user] = useAuth();

  const getCart = async () => {
    try {
      const data = await API.getItemsCart(jwt);

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

  const addItem = async (productId, quantity) => {
    try {
      await API.addItem(jwt, productId, { quantity });

      await getCart();

      console.log('Product added successfully');
    } catch (error) {
      console.log('addItem', error);
    }
  };
  const removeItem = async () => {};
  const updateQuantity = async (itemId, quantity) => {
    try {
      await API.updateQuantity(jwt, itemId, { quantity });
      setCart((current) =>
        current.map((itemCart) => {
          if (itemCart.id === itemId) itemCart.quantity = quantity;
          return itemCart;
        })
      );
    } catch (error) {
      console.log('Cart Provider', error);
    }
  };
  const updateVisibility = async ({ id, visible }) => {
    try {
      await API.updateVisibility(jwt, id);
      setCart((current) =>
        current.map((item) => {
          if (item.id === id) item.visible = !visible;
          return item;
        })
      );
    } catch (error) {
      console.log('Cart Provider', error);
    }
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
      updateQuantity,
      updateVisibility,
      clearCart,
      subTotals,
      totalProduct,
      stateControlls,
      totalItems,
    },
  ];

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
