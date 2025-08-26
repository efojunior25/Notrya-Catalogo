import React from 'react';
import { HomeContainer, SearchSection, ProductsSection, PaginationWrapper } from './Home.styles';
import { ProductGrid } from '../../components/product';
import { Input, Button, Loading } from '../../components/common';
import { useProducts } from '../../hooks/useProducts';
import { useAuth } from '../../contexts/AuthContext';
import { Product } from '../../types';

interface HomeProps {
    onAddToCart: (product: Product) => void;
    isAdminMode?: boolean;
    onEditProduct?: (product: Product) => void;
    onDeleteProduct?: (id: number) => void;
    onOpenProductForm?: () => void;
}

export const Home: React.FC<HomeProps> = ({
                                              onAddToCart,
                                              isAdminMode = false,
                                              onEditProduct,
                                              onDeleteProduct,
                                              onOpenProductForm,
                                          }) => {
    const { state: authState } = useAuth();

    // Hook que já controla busca, paginação e debounce
    const {
        products,
        currentPage,
        totalPages,
        isLoading,
        error,
        setCurrentPage,
        setSearchTerm,
        refetch,
    } = useProducts(6); // 6 produtos por página

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleRetry = () => {
        refetch();
    };

    if (error) {
        return (
            <HomeContainer>
                <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <h2 style={{ color: '#DC3545', margin: 0 }}>
                        Ops! Algo deu errado
                    </h2>
                    <p style={{ margin: 0, color: '#5F6368' }}>
                        {error}
                    </p>
                    <Button
                        variant="primary"
                        onClick={handleRetry}
                    >
                        🔄 Tentar Novamente
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
                    placeholder="Buscar produtos por nome, categoria, cor..."
                    onChange={handleSearch}
                    fullWidth
                />
                {isAdminMode && authState.isAuthenticated && onOpenProductForm && (
                    <Button
                        variant="primary"
                        onClick={onOpenProductForm}
                        style={{ marginLeft: '1rem', flexShrink: 0 }}
                    >
                        ➕ Novo Produto
                    </Button>
                )}
            </SearchSection>

            <ProductsSection>
                {isLoading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '400px'
                    }}>
                        <Loading text="Carregando produtos..." size="large" />
                    </div>
                ) : (
                    <>
                        <ProductGrid
                            products={products}
                            isAdminMode={isAdminMode}
                            onAddToCart={!isAdminMode ? onAddToCart : undefined}
                            onEditProduct={isAdminMode ? onEditProduct : undefined}
                            onDeleteProduct={isAdminMode ? onDeleteProduct : undefined}
                        />

                        {/* Paginação */}
                        {totalPages > 1 && (
                            <PaginationWrapper>
                                <Button
                                    variant="secondary"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 0}
                                >
                                    ← Anterior
                                </Button>

                                <span>
                                    Página {currentPage + 1} de {totalPages}
                                </span>

                                <Button
                                    variant="secondary"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages - 1}
                                >
                                    Próxima →
                                </Button>
                            </PaginationWrapper>
                        )}
                    </>
                )}
            </ProductsSection>
        </HomeContainer>
    );
};