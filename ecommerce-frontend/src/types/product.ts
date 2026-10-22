export interface Product {
  id: number;
  name: string;
  description: string;
  brand: string;
  price: number;
  stockQuantity: number;
  discountPercentage: number;
  active: boolean;
categoryId: number;
categoryName: string;
  imageUrls: string[];
}

export interface ProductPage {
  content: Product[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  last: boolean;
}