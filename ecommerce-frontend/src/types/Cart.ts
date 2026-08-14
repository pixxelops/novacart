export interface CartItemResponse{
    productId: number;
  productName: string;
  price: number;
  quantity: number;
  subtotal: number;
  imageUrls: string[];
}

export interface CartResponse {
  cartId: number;
  items: CartItemResponse[];
  totalItems: number;
  totalPrice: number;
}