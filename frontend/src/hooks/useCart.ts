import { useState, useEffect } from 'react';
import { CartItem, Product, OrderRequest } from '../types';
import { cartService } from '../services';

export const useCart = () => {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart));
            } catch (error) {
                console.error('Error loading cart from localStorage:', error);
            }
        }
    }, []);

    // Save cart to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(items));
    }, [items]);

    const addItem = (product: Product) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.productId === product.id);

            if (existingItem) {
                if (existingItem.quantity >= product.stock) {
                    return prevItems; // Don't add if would exceed stock
                }
                return prevItems.map(item =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }

            return [...prevItems, {
                productId: product.id,
                productName: product.name,
                price: product.price,
                quantity: 1,
                stock: product.stock,
                imageUrl: product.imageUrl,
            }];
        });
    };

    const removeItem = (productId: number) => {
        setItems(prevItems => {
            const existingItem = prevItems.find(item => item.productId === productId);

            if (existingItem && existingItem.quantity > 1) {
                return prevItems.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }

            return prevItems.filter(item => item.productId !== productId);
        });
    };

    const removeItemCompletely = (productId: number) => {
        setItems(prevItems => prevItems.filter(item => item.productId !== productId));
    };

    const updateItemQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeItemCompletely(productId);
            return;
        }

        setItems(prevItems =>
            prevItems.map(item =>
                item.productId === productId
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => {
        setItems([]);
    };

    const getTotal = () => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getItemCount = () => {
        return items.reduce((count, item) => count + item.quantity, 0);
    };

    const checkout = async () => {
        if (items.length === 0) {
            throw new Error('Cart is empty');
        }

        const orderRequest: OrderRequest = {
            items: items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        };

        try {
            const result = await cartService.checkout(orderRequest);
            clearCart();
            return { success: true, data: result };
        } catch (error: any) {
            if (error.type === 'stock_error') {
                return { success: false, stockErrors: error.errors };
            }
            throw error;
        }
    };

    return {
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        removeItemCompletely,
        updateItemQuantity,
        clearCart,
        getTotal,
        getItemCount,
        checkout,
    };
};