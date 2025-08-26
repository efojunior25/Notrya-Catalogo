export interface CartItem {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    stock: number;
    imageUrl?: string;
}

export interface OrderItem {
    productId: number;
    quantity: number;
}

export interface OrderRequest {
    items: OrderItem[];
}

export interface OrderResponse {
    id: number;
    createAt: string;
    total: number;
    items: Array<{
        productId: number;
        productName: string;
        quantity: number;
        unitPrice: number;
        lineTotal: number;
    }>;
}

export interface StockError {
    productId: number;
    available: number;
    productName?: string;
}