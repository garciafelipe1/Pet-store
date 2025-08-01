"use client";

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
  }) => void;
  removeFromCart: (_id: string) => void;
  updateQuantity: (_id: string, newQuantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isCartLoaded: boolean;
  // Agregamos el estado para el carrito lateral
  isCartSheetOpen: boolean;
  openCartSheet: () => void;
  closeCartSheet: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartLoaded, setIsCartLoaded] = useState(false);
  const [isCartSheetOpen, setIsCartSheetOpen] = useState(false); // <-- Nuevo estado

  // Cargar el carrito de localStorage SOLO en el cliente (una vez)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      setIsCartLoaded(true);
    }
  }, []);

  // Guardar el carrito en localStorage cada vez que cambie, pero solo si ya fue cargado
  useEffect(() => {
    if (isCartLoaded && typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isCartLoaded]);

  const addToCart = (product: {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
  }) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (_id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== _id));
  };

  const updateQuantity = (_id: string, newQuantity: number) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item._id !== _id);
      }
      return prevCart.map((item) =>
        item._id === _id ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Nuevas funciones para controlar el estado del carrito lateral
  const openCartSheet = () => setIsCartSheetOpen(true);
  const closeCartSheet = () => setIsCartSheetOpen(false);

  const contextValue: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isCartLoaded,
    isCartSheetOpen, 
    openCartSheet, 
    closeCartSheet, 
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
