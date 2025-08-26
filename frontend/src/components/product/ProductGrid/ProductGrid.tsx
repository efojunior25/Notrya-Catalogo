// frontend/src/components/product/ProductGrid/ProductGrid.tsx - VERSÃO CORRIGIDA
import React from 'react';
import { Product } from '../../../types';
import { ProductCard } from '../ProductCard';
import { Loading } from '../../common';
import {
    GridContainer,
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
    isAdminMode?: boolean;
    onAddToCart?: (product: Product) => void;
    onEditProduct?: (product: Product) => void;
    onDeleteProduct?: (id: number) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
                                                            products,
                                                            isAdminMode = false,
                                                            onAddToCart,
                                                            onEditProduct,
                                                            onDeleteProduct,
                                                        }) => {
    if (products.length === 0) {
        return (
            <GridContainer>
                <EmptyState>
                    <EmptyStateIcon>📦</EmptyStateIcon>
                    <EmptyStateTitle>
                        Nenhum produto encontrado
                    </EmptyStateTitle>
                    <EmptyStateDescription>
                        {isAdminMode
                            ? 'Adicione produtos para começar a gerenciar seu catálogo.'
                            : 'Não encontramos produtos no momento. Volte em breve!'
                        }
                    </EmptyStateDescription>
                </EmptyState>
            </GridContainer>
        );
    }

    return (
        <GridContainer>
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
        </GridContainer>
    );
};