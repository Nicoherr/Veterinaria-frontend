import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);

const readStoredCart = () => {
  try {
    if (typeof window === 'undefined') return [];
    const saved = window.localStorage.getItem('vetsm_cart');
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => readStoredCart());

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('vetsm_cart', JSON.stringify(cart));
      }
    } catch {
      // Ignoramos errores de almacenamiento si el navegador no lo permite.
    }
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

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};
