import React from 'react';
import { CartItem as CartItemType } from '../../../types';
import { Button } from '../../common';
import { CartItem } from '../CartItem';
import {
    CartOverlay,
    CartSidebar,
    CartHeader,
    CartTitle,
    CloseButton,
    CartContent,
    EmptyCart,
    EmptyCartIcon,
    EmptyCartText,
    CartTotal,
    TotalAmount,
    CheckoutButton
} from './Cart.styles';


interface CartProps {
    isOpen: boolean;
    items: CartItemType[];
    onClose: () => void;
    onUpdateQuantity: (productId: number, quantity: number) => void;
    onRemoveItem: (productId: number) => void;
    onCheckout: () => void;
    isLoading?: boolean;
}

export const Cart: React.FC<CartProps> = ({
                                              isOpen,
                                              items,
                                              onClose,
                                              onUpdateQuantity,
                                              onRemoveItem,
                                              onCheckout,
                                              isLoading = false,
                                          }) => {
    if (!isOpen) return null;

    const getTotal = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const formatPrice = (price: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(price);
    };

    return (
        <CartOverlay onClick={onClose}>
            <CartSidebar onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                <CartHeader>
                    <CartTitle>Carrinho de Compras</CartTitle>
                    <CloseButton onClick={onClose} aria-label="Fechar carrinho">
                        ✕
                    </CloseButton>
                </CartHeader>

                <CartContent>
                    {items.length === 0 ? (
                        <EmptyCart>
                            <EmptyCartIcon>🛒</EmptyCartIcon>
                            <EmptyCartText>Seu carrinho está vazio</EmptyCartText>
                            <p>Adicione alguns produtos incríveis da NOTRYA!</p>
                        </EmptyCart>
                    ) : (
                        <>
                            {items.map((item) => (
                                <CartItem
                                    key={item.productId}
                                    item={item}
                                    onUpdateQuantity={onUpdateQuantity}
                                    onRemove={onRemoveItem}
                                />
                            ))}

                            <CartTotal>
                                <TotalAmount>
                                    Total: {formatPrice(getTotal())}
                                </TotalAmount>
                                <CheckoutButton
                                    variant="primary"
                                    size="large"
                                    onClick={onCheckout}
                                    loading={isLoading}
                                    disabled={isLoading}
                                    fullWidth
                                >
                                    {isLoading ? 'Processando...' : 'Finalizar Pedido'}
                                </CheckoutButton>
                            </CartTotal>
                        </>
                    )}
                </CartContent>
            </CartSidebar>
        </CartOverlay>
    );
};