import api from "./api";

export interface OrderItemResponse {
  productId: number;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface OrderResponse {
  orderId: number;
  userId: number;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  items: OrderItemResponse[];
}


export const createOrder = async():Promise<OrderResponse> =>{
    const respone = await api.post<OrderResponse>("/orders");

    return respone.data;
}

export const getMyOrder = async(): Promise<OrderResponse[]> =>{
    const response = await api.get<OrderResponse[]>("/orders");

    return response.data;
}

export const getOrderById = async(
    orderId : number
): Promise<OrderResponse> =>{
    const response = await api.get<OrderResponse>(
        `/orders/${orderId}`
    );

    return response.data;
}


export const cancelOrder = async(
    orderId : number
): Promise<OrderResponse> =>{
    const response = await api.put<OrderResponse>(
        `/orders/${orderId}/cancel`
    );

    return response.data;
}


