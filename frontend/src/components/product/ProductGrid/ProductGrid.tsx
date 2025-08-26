import React from 'react';
import { Product } from '../../../types';
import { ProductCard } from '../ProductCard';
import { Loading } from '../../common';
import {
    GridContainer,
    SearchContainer,
    SearchInput,
    ProductsGrid,
    EmptyState,
    EmptyStateIcon,
    EmptyStateTitle,
    EmptyStateDescription,
    PaginationContainer,
    PaginationButton,
    PaginationInfo,
} from './ProductGrid.styles';

interface ProductGridProps {
    products: Product[];
    isLoading: boolean;
    searchTerm: string;
    currentPage: number;
    totalPages: number;
    isAdminMode?: boolean;
    onSearchChange: (term: string) => void;
    onPageChange: (page: number) => void;
    onAddToCart?: (product: Product) => void;
    onEditProduct?: (product: Product) => void;
    onDeleteProduct?: (id: number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
                                                            products,
                                                            isLoading,
                                                            searchTerm,
                                                            currentPage,
                                                            totalPages,
                                                            isAdminMode = false,
                                                            onSearchChange,
                                                            onPageChange,
                                                            onAddToCart,
                                                            onEditProduct,
                                                            onDeleteProduct,
                                                        }) => {
    if (isLoading) {
        return <Loading text="Carregando produtos..." size="large" />;
    }

    return (
        <GridContainer>
            <SearchContainer>
                <SearchInput
                    type="text"
                    placeholder="Buscar produtos por nome, categoria, cor..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </SearchContainer>

            {products.length === 0 ? (
                <EmptyState>
                    <EmptyStateIcon>🔍</EmptyStateIcon>
                    <EmptyStateTitle>
                        {searchTerm ? 'Nenhum produto encontrado' : 'Nenhum produto disponível'}
                    </EmptyStateTitle>
                    <EmptyStateDescription>
                        {searchTerm
                            ? `Não encontramos produtos para "${searchTerm}". Tente uma busca diferente.`
                            : 'Ainda não há produtos cadastrados na loja.'
                        }
                    </EmptyStateDescription>
                </EmptyState>
            ) : (
                <>
                    <ProductsGrid>
                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                isAdminMode={isAdminMode}
                                onAddToCart={onAddToCart}
                                onEdit={onEditProduct}
                                onDelete={onDeleteProduct}
                            />
                        ))}
                    </ProductsGrid>

                    {totalPages > 1 && (
                        <PaginationContainer>
                            <PaginationButton
                                disabled={currentPage === 0}
                                onClick={() => onPageChange(currentPage - 1)}
                            >
                                ← Anterior
                            </PaginationButton>

                            <PaginationInfo>
                                Página {currentPage + 1} de {totalPages}
                            </PaginationInfo>

                            <PaginationButton
                                disabled={currentPage === totalPages - 1}
                                onClick={() => onPageChange(currentPage + 1)}
                            >
                                Próxima →
                            </PaginationButton>
                        </PaginationContainer>
                    )}
                </>
            )}
        </GridContainer>
    );
};