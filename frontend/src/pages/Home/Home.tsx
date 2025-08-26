import React, { useState, useEffect, useCallback } from 'react';
import { HomeContainer, SearchSection, ProductsSection, PaginationWrapper } from './Home.styles';
import { ProductGrid } from '../../components/product';
import { Input, Button, Loading } from '../../components/common';
import { useProducts } from '../../hooks/useProducts';
import { useAuth } from '../../contexts/AuthContext';
import { Product } from '../../types';

interface HomeProps {
    onAddToCart: (product: Product) => void;
    onEditProduct?: (product: Product) => void;
    onDeleteProduct?: (id: number) => void;
    isAdminMode?: boolean;
    onOpenProductForm?: () => void;
}

export const Home: React.FC<HomeProps> = ({
                                              onAddToCart,
                                              onEditProduct,
                                              onDeleteProduct,
                                              isAdminMode = false,
                                              onOpenProductForm,
                                          }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(0);
    const { state: authState } = useAuth();

    const {
        products,
        totalPages,
        isLoading,
        error,
        refetch,
    } = useProducts();

    const PAGE_SIZE = 6;

    // Debounced search
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCurrentPage(0);
            refetch({
                search: searchTerm,
                page: 0,
                size: PAGE_SIZE,
            });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, refetch]);

    // Fetch products when page changes
    useEffect(() => {
        refetch({
            search: searchTerm,
            page: currentPage,
            size: PAGE_SIZE,
        });
    }, [currentPage, refetch]);

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    if (error) {
        return (
            <HomeContainer>
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                    <p>Erro ao carregar produtos: {error}</p>
                    <Button
                        variant="primary"
                        onClick={() => fetchProducts({ search: searchTerm, page: currentPage, size: PAGE_SIZE })}
                    >
                        Tentar Novamente
                    </Button>
                </div>
            </HomeContainer>
        );
    }

    return (
        <HomeContainer>
            <SearchSection>
                <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={handleSearch}
                    fullWidth
                />
                {isAdminMode && authState.isAuthenticated && (
                    <Button
                        variant="primary"
                        onClick={onOpenProductForm}
                        style={{ marginLeft: '1rem' }}
                    >
                        ➕ Novo Produto
                    </Button>
                )}
            </SearchSection>

            <ProductsSection>
                {isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                        <Loading />
                    </div>
                ) : (
                    <>
                        <ProductGrid
                            products={products}
                            onAddToCart={onAddToCart}
                            onEditProduct={onEditProduct}
                            onDeleteProduct={onDeleteProduct}
                            isAdminMode={isAdminMode}
                        />

                        {totalPages > 1 && (
                            <PaginationWrapper>
                                <Button
                                    variant="secondary"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 0}
                                >
                                    Anterior
                                </Button>
                                <span>
                  Página {currentPage + 1} de {totalPages}
                </span>
                                <Button
                                    variant="secondary"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages - 1}
                                >
                                    Próxima
                                </Button>
                            </PaginationWrapper>
                        )}
                    </>
                )}
            </ProductsSection>
        </HomeContainer>
    );
};