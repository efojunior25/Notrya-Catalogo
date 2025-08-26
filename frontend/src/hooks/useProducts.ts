import { useState, useEffect, useCallback } from 'react';
import { Product, ProductPage, ProductFormData } from '../types';
import { productService } from '../services';

export const useProducts = (pageSize: number = 6) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProducts = useCallback(async (search: string, page: number) => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await productService.getProducts({
                page,
                size: pageSize,
                search,
            });
            setProducts(data.content);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
        } finally {
            setIsLoading(false);
        }
    }, [pageSize]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCurrentPage(0);
            fetchProducts(searchTerm, 0);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, fetchProducts]);

    useEffect(() => {
        fetchProducts(searchTerm, currentPage);
    }, [currentPage, fetchProducts, searchTerm]);

    const createProduct = async (productData: ProductFormData) => {
        try {
            await productService.createProduct(productData);
            await fetchProducts(searchTerm, currentPage);
            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Failed to create product'
            };
        }
    };

    const updateProduct = async (id: number, productData: ProductFormData) => {
        try {
            await productService.updateProduct(id, productData);
            await fetchProducts(searchTerm, currentPage);
            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Failed to update product'
            };
        }
    };

    const deleteProduct = async (id: number) => {
        try {
            await productService.deleteProduct(id);
            await fetchProducts(searchTerm, currentPage);
            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Failed to delete product'
            };
        }
    };

    const uploadImage = async (file: File) => {
        try {
            const response = await productService.uploadImage(file);
            return { success: true, data: response };
        } catch (err) {
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Failed to upload image'
            };
        }
    };

    const deleteImage = async (filename: string) => {
        try {
            await productService.deleteImage(filename);
            return { success: true };
        } catch (err) {
            return {
                success: false,
                error: err instanceof Error ? err.message : 'Failed to delete image'
            };
        }
    };

    return {
        products,
        currentPage,
        totalPages,
        searchTerm,
        isLoading,
        error,
        setCurrentPage,
        setSearchTerm,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadImage,
        deleteImage,
        refetch: () => fetchProducts(searchTerm, currentPage),
    };
};