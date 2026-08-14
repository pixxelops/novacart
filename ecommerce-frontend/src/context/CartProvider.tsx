import { useCallback, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "./useAuth";

import {
  
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  getMyCart,
} from "../services/cartService";
import type { CartResponse } from "../types/Cart";



interface Props {
  children: React.ReactNode;
}

export function CartProvider({ children }: Props) {
  const { isAuthenticated } = useAuth();

  const [cart, setCart] = useState<CartResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshCart = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }

    try {
      setLoading(true);

      const data = await getMyCart();

      setCart(data);
    } catch (error) {
      console.error("Failed to load cart:", error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    void refreshCart();
  }, [refreshCart]);

  const addItemToCart = async (
    productId: number,
    quantity: number
  ): Promise<CartResponse> => {
    const data = await addToCart(productId, quantity);

    setCart(data);

    return data;
  };

  const updateItemQuantity = async (
    productId: number,
    quantity: number
  ): Promise<CartResponse> => {
    const data = await updateCartItem(productId, quantity);

    setCart(data);

    return data;
  };

  const removeItemFromCart = async (
    productId: number
  ): Promise<CartResponse> => {
    const data = await removeFromCart(productId);

    setCart(data);

    return data;
  };

  const clearUserCart = async (): Promise<void> => {
    await clearCart();

    setCart((currentCart) => {
      if (!currentCart) {
        return null;
      }

      return {
        ...currentCart,
        items: [],
        totalItems: 0,
        totalPrice: 0,
      };
    });
  };

  const cartItemCount = cart?.totalItems ?? 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItemCount,
        loading,
        refreshCart,
        addItemToCart,
        updateItemQuantity,
        removeItemFromCart,
        clearUserCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}