
import type { CartResponse } from "../types/Cart";
import api from "./api";

export const getMyCart = async(): Promise<CartResponse> =>{
    const response = await api.get<CartResponse>("/cart");

    return response.data;
}

export const addToCart = async(
    productId : number,
    quantity : number
):Promise<CartResponse> =>{
    const response = await api.post<CartResponse>(
        "/cart/items",
        null,
        {
            params:{
                productId,
                quantity,
            },
        }
    );

    return response.data;
}


export const updateCartItem = async(
    productId:number,
    quantity:number

): Promise<CartResponse> =>{

    const response = await api.put<CartResponse>(
        `/cart/items/${productId}`,
        null,
        {
            params:{
                quantity,
            },
        }

    )

    return response.data;


};


export const removeFromCart = async(
    productId : number
):Promise<CartResponse> =>{
    const response = await api.delete<CartResponse>(
        `/cart/items/${productId}`
    );

    return response.data;
}

export const clearCart = async() :Promise<void> => {
    await api.delete("/cart");
}

