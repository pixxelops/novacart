import type { Product, ProductPage } from "../types/product";
import api from "./api";


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