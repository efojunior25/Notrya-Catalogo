import { Product, ProductPage, ProductFormData, PaginationParams, ImageUploadResponse } from '../../types';
import { apiClient } from '../api/client';

export interface IProductService {
    getProducts(params: PaginationParams): Promise<ProductPage>;
    createProduct(product: ProductFormData): Promise<Product>;
    updateProduct(id: number, product: ProductFormData): Promise<Product>;
    deleteProduct(id: number): Promise<void>;
    uploadImage(file: File): Promise<ImageUploadResponse>;
    deleteImage(filename: string): Promise<void>;
}

class ProductService implements IProductService {
    async getProducts(params: PaginationParams): Promise<ProductPage> {
        const { page, size, search = '' } = params;
        const queryParams = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            search,
        });

        return apiClient.get<ProductPage>(`/products?${queryParams}`);
    }

    async createProduct(product: ProductFormData): Promise<Product> {
        return apiClient.post<Product>('/admin/products', product);
    }

    async updateProduct(id: number, product: ProductFormData): Promise<Product> {
        return apiClient.put<Product>(`/admin/products/${id}`, product);
    }

    async deleteProduct(id: number): Promise<void> {
        return apiClient.delete<void>(`/admin/products/${id}`);
    }

    async uploadImage(file: File): Promise<ImageUploadResponse> {
        const formData = new FormData();
        formData.append('file', file);

        return apiClient.upload<ImageUploadResponse>('/upload/image', formData);
    }

    async deleteImage(filename: string): Promise<void> {
        return apiClient.delete<void>(`/upload/image/${filename}`);
    }
}

export const productService = new ProductService();