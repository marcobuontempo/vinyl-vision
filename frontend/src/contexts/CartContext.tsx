/**
 * CartProvider Component.
 *
 * Provides shopping cart context to the application.
 * - Stores cart items in state and syncs with localStorage.
 * - Provides functions to add, remove, clear, and retrieve cart items.
 *
 */

// TYPES IMPORTS
import type { MusicItemType } from "../../../shared/types";
import type { ReactNode } from "react";
// NPM IMPORTS
import { createContext, useContext, useEffect, useState } from "react";

// COMPONENT PROPS
type Props = {
  children: ReactNode;
};

// CART TYPE
type CartType = {
  [id: string]: MusicItemType;
};

// CONTEXT TYPE
type CartContextType = {
  cart: CartType;
  getCartLocalStorage: () => CartType | null;
  addToCart: (item: MusicItemType) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
};

// CREATE CONTEXT
const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Custom hook to access CartContext.
 * @throws if used outside CartProvider
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within an CartProvider");
  }
  return context;
};

/**
 * CartProvider component to wrap the app and provide cart state.
 *
 * @param children - ReactNode elements that will consume the cart context.
 * @returns JSX element providing CartContext to children.
 */
export const CartProvider = ({ children }: Props) => {
  // Current cart state
  const [cart, setCart] = useState<CartType>({});

  // Initialise current cart from localStorage on mount
  useEffect(() => {
    const cartData = getCartLocalStorage();
    setCart(cartData);
  }, []);

  /**
   * Retrieve cart from localStorage.
   * @returns CartType object or empty object if none found
   */
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

  /**
   * Add an item to the cart.
   * @param item - MusicItemType to add
   * @note Does not add item if it already exists in the cart
   */
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

  /**
   * Remove an item from the cart by ID.
   * @param id - ID of the item to remove
   */
  const removeFromCart = (id: string) => {
    const newCart = { ...cart };
    delete newCart[id];
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  // Clear all items from cart
  const clearCart = () => {
    setCart({});
    localStorage.setItem("cart", JSON.stringify({}));
  };

  // Context value provided to consumers
  const value = {
    cart,
    getCartLocalStorage,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
