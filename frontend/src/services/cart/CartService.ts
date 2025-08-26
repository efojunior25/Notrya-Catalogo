import { OrderRequest, OrderResponse, StockError, CartItem } from '../../types';
import { apiClient } from '../api/client';

export interface ICartService {
    checkout(order: OrderRequest): Promise<OrderResponse>;
    validateStock(order: OrderRequest): Promise<StockError[] | null>;

    // Métodos adicionados para compatibilidade com o CartContext
    loadCart(): CartItem[];
    saveCart(items: CartItem[]): void;
    clearCart(): void;
    calculateTotal(items: CartItem[]): number;
    getItemCount(items: CartItem[]): number;
    createOrder(order: OrderRequest): Promise<{ success: boolean; data?: OrderResponse | StockError[]; message: string }>;
}

const STORAGE_KEY = 'cart';

class CartService implements ICartService {
    async checkout(order: OrderRequest): Promise<OrderResponse> {
        try {
            return await apiClient.post<OrderResponse>('/orders', order);
        } catch (error: any) {
            if (error.status === 409) {
                const stockErrors: StockError[] = await error.response.json();
                throw { type: 'stock_error', errors: stockErrors };
            }
            throw error;
        }
    }

    async validateStock(order: OrderRequest): Promise<StockError[] | null> {
        try {
            await this.checkout(order);
            return null;
        } catch (error: any) {
            if (error.type === 'stock_error') {
                return error.errors;
            }
            return null;
        }
    }

    // Persistência local simples
    loadCart(): CartItem[] {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? JSON.parse(raw) as CartItem[] : [];
        } catch {
            return [];
        }
    }

    saveCart(items: CartItem[]): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
        } catch {
            // noop
        }
    }

    clearCart(): void {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch {
            // noop
        }
    }

    calculateTotal(items: CartItem[]): number {
        return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }

    getItemCount(items: CartItem[]): number {
        return items.reduce((sum, item) => sum + item.quantity, 0);
    }

    // Adapter para o formato esperado pelo CartContext
    async createOrder(order: OrderRequest): Promise<{ success: boolean; data?: OrderResponse | StockError[]; message: string }> {
        try {
            const response = await this.checkout(order);
            return {
                success: true,
                data: response,
                message: 'Pedido criado com sucesso',
            };
        } catch (error: any) {
            if (error?.type === 'stock_error') {
                return {
                    success: false,
                    data: error.errors as StockError[],
                    message: 'Erros de estoque ao criar o pedido',
                };
            }
            return {
                success: false,
                message: error?.message ?? 'Erro ao criar pedido',
            };
        }
    }
}

export const cartService = new CartService();