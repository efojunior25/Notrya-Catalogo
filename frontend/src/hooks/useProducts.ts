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

    // Ref para evitar múltiplas chamadas concorrentes
    const isLoadingRef = useRef(false);

    // Guardar pageSize estável
    const pageSizeRef = useRef(pageSize);
    pageSizeRef.current = pageSize;

    const fetchProducts = useCallback(async (search: string, page: number) => {
        if (isLoadingRef.current) return;

        isLoadingRef.current = true;
        setIsLoading(true);
        setError(null);

        try {
            const data: ProductPage = await productService.getProducts({
                page,
                size: pageSizeRef.current,
                search: search || '',
            });

            setProducts(data.content || []);
            setTotalPages(data.totalPages || 0);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch products');
            setProducts([]);
        } finally {
            isLoadingRef.current = false;
            setIsLoading(false);
        }
    }, []);

    // 🔹 Buscar ao mudar searchTerm (com debounce) – não altera currentPage
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchProducts(searchTerm, 0);
            setCurrentPage(0);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, fetchProducts]);

    // 🔹 Buscar ao mudar página (exceto página inicial já buscada)
    useEffect(() => {
        if (currentPage > 0) {
            fetchProducts(searchTerm, currentPage);
        }
    }, [currentPage, fetchProducts, searchTerm]);

    // 🔹 Primeira carga (só uma vez)
    useEffect(() => {
        fetchProducts('', 0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 🔹 Buscar ao mudar pageSize (sem depender do searchTerm)
    useEffect(() => {
        if (pageSizeRef.current !== pageSize) {
            pageSizeRef.current = pageSize;
            setCurrentPage(0);
            fetchProducts(searchTerm, 0);
        }
    }, [pageSize, fetchProducts, searchTerm]);

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
            const newCurrentPage = products.length === 1 && currentPage > 0 ? currentPage - 1 : currentPage;
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
