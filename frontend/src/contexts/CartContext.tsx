import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { MusicItemType } from "../../../shared/types";

type CartType = {
  [id: string]: MusicItemType;
};

type CartContextType = {
  cart: CartType;
  getCartLocalStorage: () => CartType | null;
  addToCart: (item: MusicItemType) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within an CartProvider");
  }
  return context;
};

type Props = {
  children: ReactNode;
};

export const CartProvider = ({ children }: Props) => {
  const [cart, setCart] = useState<CartType>({});

  useEffect(() => {
    const cartData = getCartLocalStorage();
    setCart(cartData);
  }, []);

  const getCartLocalStorage = () => {
    try {
      const cart = localStorage.getItem("cart");
      if (!cart) return {};
      const savedCart = JSON.parse(cart) as CartType;
      return savedCart;
    } catch (error) {
      return {};
    }
  };

  const addToCart = (item: MusicItemType) => {
    // don't add item if already in cart
    if (cart[item.id]) return;
    const newCart = {
      ...cart,
      [item.id]: item,
    };
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const removeFromCart = (id: string) => {
    const newCart = { ...cart };
    delete newCart[id];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart({});
    localStorage.setItem("cart", JSON.stringify({}));
  };

  const value = {
    cart,
    getCartLocalStorage,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
