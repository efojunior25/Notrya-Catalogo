import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { CartItem, Product, OrderRequest, OrderResponse, StockError } from '../types';
import { cartService } from '../services/cart/CartService';

interface CartState {
    items: CartItem[];
    isOpen: boolean;
    isLoading: boolean;
    error: string | null;
    stockErrors: StockError[];
}

type CartAction =
    | { type: 'ADD_ITEM'; payload: { product: Product; quantity?: number } }
    | { type: 'REMOVE_ITEM'; payload: { productId: number; quantity?: number } }
    | { type: 'REMOVE_ITEM_COMPLETELY'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'TOGGLE_CART' }
    | { type: 'OPEN_CART' }
    | { type: 'CLOSE_CART' }
    | { type: 'CHECKOUT_START' }
    | { type: 'CHECKOUT_SUCCESS'; payload: OrderResponse }
    | { type: 'CHECKOUT_ERROR'; payload: { message: string; stockErrors?: StockError[] } }
    | { type: 'CLEAR_ERROR' }
    | { type: 'LOAD_CART'; payload: CartItem[] };

const initialState: CartState = {
    items: [],
    isOpen: false,
    isLoading: false,
    error: null,
    stockErrors: [],
};

const CartContext = createContext<{
    state: CartState;
    addToCart: (product: Product, quantity?: number) => void;
    removeFromCart: (productId: number, quantity?: number) => void;
    removeItemCompletely: (productId: number) => void;
    updateQuantity: (productId: number, quantity: number) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    checkout: () => Promise<void>;
    clearError: () => void;
    getCartTotal: () => number;
    getItemCount: () => number;
} | null>(null);

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { product, quantity = 1 } = action.payload;
            const existingItem = state.items.find(item => item.productId === product.id);

            let updatedItems: CartItem[];

            if (existingItem) {
                // ✅ Verificar se a quantidade total não excede o stock REAL
                const newQuantity = existingItem.quantity + quantity;
                if (newQuantity > product.stock) {
                    return {
                        ...state,
                        error: `Apenas ${product.stock} unidades disponíveis`,
                    };
                }

                updatedItems = state.items.map(item =>
                    item.productId === product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            } else {
                if (product.stock === 0) {
                    return {
                        ...state,
                        error: 'Produto fora de estoque',
                    };
                }

                if (quantity > product.stock) {
                    return {
                        ...state,
                        error: `Apenas ${product.stock} unidades disponíveis`,
                    };
                }

                const newItem: CartItem = {
                    productId: product.id,
                    productName: product.name,
                    price: product.price,
                    quantity,
                    stock: product.stock, // ✅ Guardar stock real
                    imageUrl: product.imageUrl,
                };
                updatedItems = [...state.items, newItem];
            }

            return {
                ...state,
                items: updatedItems,
                error: null,
            };
        }

        case 'REMOVE_ITEM': {
            const { productId, quantity = 1 } = action.payload;
            const existingItem = state.items.find(item => item.productId === productId);

            if (!existingItem) return state;

            let updatedItems: CartItem[];

            if (existingItem.quantity > quantity) {
                updatedItems = state.items.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity - quantity }
                        : item
                );
            } else {
                updatedItems = state.items.filter(item => item.productId !== productId);
            }

            return {
                ...state,
                items: updatedItems,
            };
        }

        case 'REMOVE_ITEM_COMPLETELY': {
            return {
                ...state,
                items: state.items.filter(item => item.productId !== action.payload),
            };
        }

        case 'UPDATE_QUANTITY': {
            const { productId, quantity } = action.payload;

            // ✅ Remover se quantidade for 0 ou negativa
            if (quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(item => item.productId !== productId),
                };
            }

            // ✅ Verificar stock antes de atualizar
            const item = state.items.find(i => i.productId === productId);
            if (item && quantity > item.stock) {
                return {
                    ...state,
                    error: `Apenas ${item.stock} unidades disponíveis`,
                };
            }

            return {
                ...state,
                items: state.items.map(item =>
                    item.productId === productId
                        ? { ...item, quantity }
                        : item
                ),
                error: null,
            };
        }

        case 'CLEAR_CART':
            return {
                ...state,
                items: [],
                error: null,
                stockErrors: [],
            };

        case 'TOGGLE_CART':
            return {
                ...state,
                isOpen: !state.isOpen,
            };

        case 'OPEN_CART':
            return {
                ...state,
                isOpen: true,
            };

        case 'CLOSE_CART':
            return {
                ...state,
                isOpen: false,
            };

        case 'CHECKOUT_START':
            return {
                ...state,
                isLoading: true,
                error: null,
                stockErrors: [],
            };

        case 'CHECKOUT_SUCCESS':
            return {
                ...state,
                items: [],
                isLoading: false,
                isOpen: false,
                error: null,
                stockErrors: [],
            };

        case 'CHECKOUT_ERROR':
            return {
                ...state,
                isLoading: false,
                error: action.payload.message,
                stockErrors: action.payload.stockErrors || [],
            };

        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
                stockErrors: [],
            };

        case 'LOAD_CART':
            return {
                ...state,
                items: action.payload,
            };

        default:
            return state;
    }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = cartService.loadCart();
        if (savedCart.length > 0) {
            dispatch({ type: 'LOAD_CART', payload: savedCart });
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        cartService.saveCart(state.items);
    }, [state.items]);

    const addToCart = (product: Product, quantity = 1) => {
        dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    };

    const removeFromCart = (productId: number, quantity = 1) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { productId, quantity } });
    };

    const removeItemCompletely = (productId: number) => {
        dispatch({ type: 'REMOVE_ITEM_COMPLETELY', payload: productId });
    };

    const updateQuantity = (productId: number, quantity: number) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    };

    const clearCart = () => {
        cartService.clearCart();
        dispatch({ type: 'CLEAR_CART' });
    };

    const toggleCart = () => {
        dispatch({ type: 'TOGGLE_CART' });
    };

    const openCart = () => {
        dispatch({ type: 'OPEN_CART' });
    };

    const closeCart = () => {
        dispatch({ type: 'CLOSE_CART' });
    };

    const checkout = async () => {
        if (state.items.length === 0) {
            dispatch({ type: 'CHECKOUT_ERROR', payload: { message: 'Carrinho vazio' } });
            return;
        }

        dispatch({ type: 'CHECKOUT_START' });

        const orderRequest: OrderRequest = {
            items: state.items.map(item => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
        };

        const response = await cartService.createOrder(orderRequest);

        if (response.success) {
            dispatch({ type: 'CHECKOUT_SUCCESS', payload: response.data as OrderResponse });
            cartService.clearCart();

            // ✅ Mostrar mensagem de sucesso
            alert(`Pedido #${(response.data as OrderResponse).id} criado com sucesso!`);
        } else {
            const stockErrors = Array.isArray(response.data) ? response.data : [];
            dispatch({
                type: 'CHECKOUT_ERROR',
                payload: {
                    message: response.message,
                    stockErrors,
                },
            });

            // ✅ Mostrar erros de estoque
            if (stockErrors.length > 0) {
                const errorMessages = stockErrors
                    .map(err => `${err.productName || 'Produto'}: apenas ${err.available} disponíveis`)
                    .join('\n');
                alert(`Erro de estoque:\n${errorMessages}`);
            }
        }
    };

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    const getCartTotal = () => {
        return cartService.calculateTotal(state.items);
    };

    const getItemCount = () => {
        return cartService.getItemCount(state.items);
    };

    return (
        <CartContext.Provider
            value={{
                state,
                addToCart,
                removeFromCart,
                removeItemCompletely,
                updateQuantity,
                clearCart,
                toggleCart,
                openCart,
                closeCart,
                checkout,
                clearError,
                getCartTotal,
                getItemCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};