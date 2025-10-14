import { useState, useEffect, useCallback, useRef } from 'react';
import { Product, ProductPage, ProductFormData } from '../types';
import { productService } from '../services';

export const useProducts = (pageSize: number = 6) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isLoadingRef = useRef(false);
    const isMountedRef = useRef(false);

    const fetchProducts = useCallback(async (search: string, page: number) => {
        if (isLoadingRef.current) return;

        isLoadingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
            const data: ProductPage = await productService.getProducts({
                page,
                size: pageSize,
                search: search || '',
            });

            setProducts(data.content || []);
            setTotalPages(data.totalPages || 0);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
            setError(errorMessage);
            setProducts([]);
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    }, [pageSize]);

    useEffect(() => {
        if (!isMountedRef.current) {
            isMountedRef.current = true;
            fetchProducts('', 0);
        }
    }, [fetchProducts]);

    useEffect(() => {
        if (!isMountedRef.current) return; // Evita busca na montagem

        const timeoutId = setTimeout(() => {
            setCurrentPage(0);
            fetchProducts(searchTerm, 0);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, fetchProducts]);

    useEffect(() => {
        if (!isMountedRef.current) return;
        if (currentPage === 0) return; // Evita duplicação na primeira página

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
            // Se deletar o último item da página, volta uma página
            const newCurrentPage = products.length === 1 && currentPage > 0
                ? currentPage - 1
                : currentPage;
            setCurrentPage(newCurrentPage);
            await fetchProducts(searchTerm, newCurrentPage);
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