import React from 'react';
import DOMPurify from 'dompurify';
import { CartItem as CartItemType } from '../../../types';
import { getImageUrl } from '../../../utils/url';
import {
    ItemContainer,
    ItemImageContainer,
    ItemImage,
    NoImagePlaceholder,
    ItemInfo,
    ItemHeader,
    ItemName,
    RemoveButton,
    ItemPrice,
    ItemDetails,
    QuantitySection,
    QuantityControls,
    QuantityButton,
    QuantityDisplay,
    StockInfo,
    ItemTotal,
    TotalLabel,
    TotalValue,
} from './CartItem.styles';

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemove: (productId: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
                                                      item,
                                                      onUpdateQuantity,
                                                      onRemove,
                                                  }) => {
    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    const handleQuantityDecrease = () => {
        if (item.quantity > 1) {
            onUpdateQuantity(item.productId, item.quantity - 1);
        }
    };

    const handleQuantityIncrease = () => {
        if (item.quantity < item.stock) {
            onUpdateQuantity(item.productId, item.quantity + 1);
        }
    };

    const handleRemove = () => {
        if (window.confirm(`Deseja remover "${item.productName}" do carrinho?`)) {
            onRemove(item.productId);
        }
    };

    const totalPrice = item.price * item.quantity;
    const isLowStock = item.stock <= 5;
    const isAtMaxQuantity = item.quantity >= item.stock;

    return (
        <ItemContainer>
            <ItemImageContainer>
                {item.imageUrl ? (
                    <ItemImage
                        src={getImageUrl(item.imageUrl)}
                        alt={item.productName}
                        onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                            const container = (e.target as HTMLImageElement).parentElement;
                            if (container) {
                                const placeholder = document.createElement('div');
                                placeholder.className = 'no-image-placeholder';
                                placeholder.innerHTML = '📦';
                                placeholder.style.cssText = `
                  width: 80px;
                  height: 80px;
                  background: #f1f3f4;
                  border: 1px solid #e8eaed;
                  border-radius: 8px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 1.5rem;
                  color: #80868b;
                `;
                                container.appendChild(placeholder);
                            }
                        }}
                    />
                ) : (
                    <NoImagePlaceholder>📦</NoImagePlaceholder>
                )}
            </ItemImageContainer>

            <ItemInfo>
                <ItemHeader>
                    <ItemName>{item.productName}</ItemName>
                    <RemoveButton
                        onClick={handleRemove}
                        title="Remover item do carrinho"
                        aria-label={`Remover ${item.productName} do carrinho`}
                    >
                        ✕
                    </RemoveButton>
                </ItemHeader>

                <ItemPrice>{formatPrice(item.price)}</ItemPrice>

                <ItemDetails>
                    Preço unitário • {isLowStock && `Apenas ${item.stock} restantes`}
                </ItemDetails>

                <QuantitySection>
                    <QuantityControls>
                        <QuantityButton
                            onClick={handleQuantityDecrease}
                            disabled={item.quantity <= 1}
                            title="Diminuir quantidade"
                            aria-label="Diminuir quantidade"
                        >
                            −
                        </QuantityButton>

                        <QuantityDisplay>{item.quantity}</QuantityDisplay>

                        <QuantityButton
                            onClick={handleQuantityIncrease}
                            disabled={isAtMaxQuantity}
                            title={isAtMaxQuantity ? 'Quantidade máxima atingida' : 'Aumentar quantidade'}
                            aria-label="Aumentar quantidade"
                        >
                            +
                        </QuantityButton>
                    </QuantityControls>

                    <div>
                        <StockInfo isLow={isLowStock}>
                            {isAtMaxQuantity ? 'Máximo atingido' : `${item.stock - item.quantity} disponíveis`}
                        </StockInfo>

                        <ItemTotal>
                            <TotalLabel>Total</TotalLabel>
                            <TotalValue>{formatPrice(totalPrice)}</TotalValue>
                        </ItemTotal>
                    </div>
                </QuantitySection>
            </ItemInfo>
        </ItemContainer>
    );
};