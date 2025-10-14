import React from 'react';
import DOMPurify from 'dompurify';
import { Product } from '../../../types';
import { getImageUrl } from '../../../utils/url';
import { Button } from '../../common';
import {
    CardContainer,
    ImageContainer,
    ProductImage,
    NoImagePlaceholder,
    AdminControls,
    AdminButton,
    CardContent,
    ProductName,
    ProductDescription,
    ProductBrand,
    ProductPrice,
    ProductDetails,
    DetailTag,
    StockInfo,
    ActionButton,
} from './ProductCard.styles';

interface ProductCardProps {
    product: Product;
    isAdminMode?: boolean;
    onAddToCart?: (product: Product) => void;
    onEdit?: (product: Product) => void;
    onDelete?: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
                                                            product,
                                                            isAdminMode = false,
                                                            onAddToCart,
                                                            onEdit,
                                                            onDelete,
                                                        }) => {
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    const translateCategory = (category: string): string => {
        const translations: Record<string, string> = {
            'CAMISETA': 'Camiseta',
            'CALCA': 'Calça',
            'BERMUDA': 'Bermuda',
            'SHORTS': 'Shorts',
            'VESTIDO': 'Vestido',
            'SAIA': 'Saia',
            'BLUSA': 'Blusa',
            'JAQUETA': 'Jaqueta',
            'CASACO': 'Casaco',
            'TENIS': 'Tênis',
            'SAPATO': 'Sapato',
            'SANDALIA': 'Sandália',
            'BONE': 'Boné',
            'CHAPEU': 'Chapéu',
            'BOLSA': 'Bolsa',
            'MOCHILA': 'Mochila',
            'CARTEIRA': 'Carteira',
            'CINTO': 'Cinto',
        };
        return translations[category] || category;
    };

    const translateSize = (size: string): string => {
        const translations: Record<string, string> = {
            'TAMANHO_34': '34',
            'TAMANHO_36': '36',
            'TAMANHO_38': '38',
            'TAMANHO_40': '40',
            'TAMANHO_42': '42',
            'TAMANHO_44': '44',
            'TAMANHO_46': '46',
            'TAMANHO_48': '48',
            'UNICO': 'Único',
        };
        return translations[size] || size;
    };

    const translateColor = (color: string): string => {
        const translations: Record<string, string> = {
            'AZUL': 'Azul',
            'PRETO': 'Preto',
            'BRANCO': 'Branco',
            'VERMELHO': 'Vermelho',
            'VERDE': 'Verde',
            'AMARELO': 'Amarelo',
            'ROSA': 'Rosa',
            'ROXO': 'Roxo',
            'LARANJA': 'Laranja',
            'MARROM': 'Marrom',
            'CINZA': 'Cinza',
            'BEGE': 'Bege',
            'NAVY': 'Navy',
            'VINHO': 'Vinho',
            'CREME': 'Creme',
            'DOURADO': 'Dourado',
            'PRATEADO': 'Prateado',
            'MULTICOLOR': 'Multicolor',
        };
        return translations[color] || color;
    };

    const translateGender = (gender: string): string => {
        const translations: Record<string, string> = {
            'MASCULINO': 'Masculino',
            'FEMININO': 'Feminino',
            'UNISSEX': 'Unissex',
        };
        return translations[gender] || gender;
    };

    const handleAddToCart = () => {
        if (onAddToCart && product.stock > 0) {
            onAddToCart(product);
        }
    };

    const handleEdit = () => {
        if (onEdit) {
            onEdit(product);
        }
    };

    const handleDelete = () => {
        if (onDelete && window.confirm('Tem certeza que deseja excluir este produto?')) {
            onDelete(product.id);
        }
    };

    return (
        <CardContainer>
            {isAdminMode && (
                <AdminControls>
                    <AdminButton
                        type="edit"
                        onClick={handleEdit}
                        title="Editar produto"
                    >
                        ✏️
                    </AdminButton>
                    <AdminButton
                        type="delete"
                        onClick={handleDelete}
                        title="Excluir produto"
                    >
                        🗑️
                    </AdminButton>
                </AdminControls>
            )}

            <ImageContainer>
                {product.imageUrl ? (
                    <ProductImage
                        src={getImageUrl(product.imageUrl)}
                        alt={product.name}
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                                const placeholder = parent.querySelector('.no-image-placeholder');
                                if (placeholder) {
                                    (placeholder as HTMLElement).style.display = 'flex';
                                }
                            }
                        }}
                    />
                ) : (
                    <NoImagePlaceholder className="no-image-placeholder">
                        📷
                    </NoImagePlaceholder>
                )}
            </ImageContainer>

            <CardContent>
                <ProductName>{product.name}</ProductName>

                {product.brand && (
                    <ProductBrand>{product.brand}</ProductBrand>
                )}

                {product.description && (
                    <ProductDescription>
                        {DOMPurify.sanitize(product.description || '')}
                    </ProductDescription>
                )}

                <ProductPrice>{formatPrice(product.price)}</ProductPrice>

                <ProductDetails>
                    <DetailTag category>{translateCategory(product.category)}</DetailTag>
                    <DetailTag>{translateSize(product.size)}</DetailTag>
                    <DetailTag color={product.color}>{translateColor(product.color)}</DetailTag>
                    <DetailTag>{translateGender(product.gender)}</DetailTag>
                </ProductDetails>

                {product.material && (
                    <ProductDetails>
                        <DetailTag material>Material: {product.material}</DetailTag>
                    </ProductDetails>
                )}

                <StockInfo isLow={product.stock <= 5} isEmpty={product.stock === 0}>
                    {product.stock === 0 ? 'Fora de estoque' :
                        product.stock <= 5 ? `Últimas ${product.stock} unidades` :
                            `${product.stock} unidades disponíveis`}
                </StockInfo>

                {!isAdminMode && (
                    <ActionButton
                        variant={product.stock > 0 ? 'primary' : 'outline'}
                        size="medium"
                        disabled={product.stock === 0}
                        onClick={handleAddToCart}
                        fullWidth
                    >
                        {product.stock === 0 ? 'Indisponível' : 'Adicionar ao Carrinho'}
                    </ActionButton>
                )}
            </CardContent>
        </CardContainer>
    );
};