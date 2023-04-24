import { useState, useEffect, createContext, useContext } from 'react';
import { useAuth } from '../auth';
import { API } from '.';

const CartContext = createContext({});

export const useCartContext = () => useContext(CartContext);

export const Provider = ({ children }) => {
  const [cart, setCart] = useState(null);

  const [user] = useAuth();

  const getCart = async () => {
    try {
      const data = await API.getItemsCart();

      // console.log('Cart Provider', data);

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
      const newItem = await API.addItem(productId, quantity);

      setCart((prev) => {
        const exist = prev.find((item) => item.id === newItem.id);

        return exist
          ? prev.filter((item) => (item.id === newItem.id ? newItem : item))
          : [...prev, newItem];
      });

      console.log('Product added successfully');
    } catch (error) {
      console.log('addItem', error);
    }
  };
  const removeItem = async () => {};
  const updateQuantity = async (itemId, quantity) => {
    try {
      await API.updateQuantity(itemId, quantity);
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
      await API.updateVisibility(id);
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

  const value = [
    cart,
    {
      setCart,
      addItem,
      removeItem,
      updateQuantity,
      updateVisibility,
      clearCart,
    },
  ];

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
