import { createContext } from "react";
import type { CartResponse } from "../types/Cart";


export interface CartContextType {
  cart: CartResponse | null;
  cartItemCount: number;
  loading: boolean;

  refreshCart: () => Promise<void>;

  addItemToCart: (
    productId: number,
    quantity: number
  ) => Promise<CartResponse>;
  
  updateItemQuantity: (
    productId: number,
    quantity: number
  ) => Promise<CartResponse>;
  removeItemFromCart: (
    productId: number
  ) => Promise<CartResponse>;
  clearUserCart: () => Promise<void>;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);