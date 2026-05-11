import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Initialise cart from localStorage if a user is already authenticated.
  const storedCart = localStorage.getItem('cart');
  const [cart, setCart] = useState(storedCart ? JSON.parse(storedCart) : []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  // ✅ Fixed: decreaseQty properly decrements without re-adding in a loop
  const decreaseQty = (productId) => {
    setCart(prev =>
      prev
        .map(item => item.id === productId ? { ...item, quantity: item.quantity - 1 } : item)
        .filter(item => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const value = {
    cart,
    cartItems: cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    decreaseQty,
    removeFromCart,
    clearCart,
  };

  // Persist cart to localStorage whenever it changes and a user is authenticated.
  const { token } = useAuth(); // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (token) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      // When not authenticated (e.g., after logout) clear persisted cart.
      localStorage.removeItem('cart');
    }
  }, [cart, token]);

  // Clear in‑memory cart when authentication state changes to unauthenticated.
  useEffect(() => {
    if (!token) {
      setCart([]);
    }
  }, [token]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};