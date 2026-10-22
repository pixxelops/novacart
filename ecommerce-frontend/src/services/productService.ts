import type { Product, ProductPage } from "../types/product";
import api from "./api";


export interface ProductRequest{
    name:string;
    description:string;
    brand: string;
    price: number;
    stockQuantity:number;
    discountPercentage?:number;
    categoryId:number;
}


export async function createProduct(
    request:ProductRequest
): Promise<Product>{

    const response = await api.post<Product>(
        "/products",
        request
    );

    return response.data;

}

export async function updateProduct(
    productId:number,
    request:ProductRequest
): Promise<Product>{
    const response = await api.put<Product>(
        `/products/${productId}`,
        request
    );

    return response.data;
}

export async function deleteProduct(
    productId:number
): Promise<void>{
    await api.delete(`/products/${productId}`);
}


export async function getProducts(
    page : number = 0,
size : number = 8,
sortBy: string="id",
direction : string="asc"
):Promise<ProductPage>{

    const response = await api.get<ProductPage>("/products",{
        params:{
            page,
            size,
            sortBy,
            direction
        }
    });

    return response.data;

}


export async function getProductById(id:number):Promise<Product>{
    const response = await api.get<Product>(`/products/${id}`);

    return response.data;
}

export async function uploadProductImages(
    productId:number,
    files:File[]
):Promise<string>{
    const formData = new FormData();

    files.forEach((file) => {
        formData.append("files", file);
    });

    const response = await api.post<string>(
        `/products/${productId}/images`,
        formData
    );

    return response.data;
}