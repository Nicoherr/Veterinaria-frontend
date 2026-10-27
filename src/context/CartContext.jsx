import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('vetsm_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('vetsm_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((previous) => {
      const exists = previous.find((entry) => entry.id === item.id);
      if (exists) {
        return previous.map((entry) =>
          entry.id === item.id ? { ...entry, cantidad: entry.cantidad + 1 } : entry
        );
      }
      return [...previous, { ...item, cantidad: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((previous) => previous.filter((item) => item.id !== id));
  };

  const updateCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((previous) => previous.map((item) => (item.id === id ? { ...item, cantidad } : item)));
  };

  const clearCart = () => setCart([]);
  const totalItems = cart.reduce((total, item) => total + item.cantidad, 0);
  const totalPrecio = cart.reduce((total, item) => total + (item.precio || 0) * item.cantidad, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCantidad,
        clearCart,
        totalItems,
        totalPrecio,
        total: totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
