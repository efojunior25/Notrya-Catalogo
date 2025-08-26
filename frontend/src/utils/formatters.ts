/**
 * Formats a price value to Brazilian Real currency
 */
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
};

/**
 * Formats a number with thousands separator
 */
export const formatNumber = (num: number): string => {
    return new Intl.NumberFormat('pt-BR').format(num);
};

/**
 * Formats a date to Brazilian format
 */
export const formatDate = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(dateObj);
};

/**
 * Formats a date with time to Brazilian format
 */
export const formatDateTime = (date: string | Date): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(dateObj);
};

/**
 * Formats a product category to display format
 */
export const formatCategory = (category: string): string => {
    const categoryMap: Record<string, string> = {
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

    return categoryMap[category] || category;
};

/**
 * Formats a product size to display format
 */
export const formatSize = (size: string): string => {
    const sizeMap: Record<string, string> = {
        'PP': 'PP',
        'P': 'P',
        'M': 'M',
        'G': 'G',
        'GG': 'GG',
        'XG': 'XG',
        'XXG': 'XXG',
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

    return sizeMap[size] || size;
};

/**
 * Formats a product color to display format
 */
export const formatColor = (color: string): string => {
    const colorMap: Record<string, string> = {
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

    return colorMap[color] || color;
};

/**
 * Formats a product gender to display format
 */
export const formatGender = (gender: string): string => {
    const genderMap: Record<string, string> = {
        'MASCULINO': 'Masculino',
        'FEMININO': 'Feminino',
        'UNISSEX': 'Unissex',
    };

    return genderMap[gender] || gender;
};

/**
 * Formats a product material to display format
 */
export const formatMaterial = (material: string): string => {
    if (!material) return '';

    const materialMap: Record<string, string> = {
        'ALGODAO': 'Algodão',
        'POLIESTER': 'Poliéster',
        'VISCOSE': 'Viscose',
        'ELASTANO': 'Elastano',
        'LINHO': 'Linho',
        'LA': 'Lã',
        'SEDA': 'Seda',
        'DENIM': 'Jeans',
        'COURO': 'Couro',
        'SINTETICO': 'Sintético',
        'MISTO': 'Misto',
        'NYLON': 'Nylon',
        'LYCRA': 'Lycra',
        'CASHMERE': 'Cashmere',
        'MODAL': 'Modal',
    };

    return materialMap[material.toUpperCase()] || material;
};

/**
 * Formats stock quantity with contextual messages
 */
export const formatStock = (stock: number): string => {
    if (stock === 0) return 'Fora de estoque';
    if (stock === 1) return '1 unidade disponível';
    if (stock <= 5) return `Apenas ${stock} unidades`;
    if (stock <= 10) return `${stock} unidades disponíveis`;
    return `${stock} unidades em estoque`;
};

/**
 * Formats stock status with color context
 */
export const getStockStatus = (stock: number): {
    status: 'out' | 'low' | 'medium' | 'good';
    message: string;
    color: string;
} => {
    if (stock === 0) {
        return {
            status: 'out',
            message: 'Fora de estoque',
            color: '#DC3545' // vermelho
        };
    }

    if (stock <= 5) {
        return {
            status: 'low',
            message: `Apenas ${stock} restante${stock > 1 ? 's' : ''}`,
            color: '#FFC107' // amarelo
        };
    }

    if (stock <= 20) {
        return {
            status: 'medium',
            message: `${stock} disponíveis`,
            color: '#17A2B8' // azul
        };
    }

    return {
        status: 'good',
        message: `${stock} em estoque`,
        color: '#28A745' // verde
    };
};

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
};

/**
 * Capitalize first letter of each word
 */
export const capitalizeWords = (text: string): string => {
    if (!text) return '';
    return text
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

/**
 * Format file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Format percentage
 */
export const formatPercentage = (value: number, total: number): string => {
    if (total === 0) return '0%';
    const percentage = (value / total) * 100;
    return `${percentage.toFixed(1)}%`;
};

/**
 * Format order status
 */
export const formatOrderStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
        'PENDING': 'Pendente',
        'CONFIRMED': 'Confirmado',
        'PROCESSING': 'Processando',
        'SHIPPED': 'Enviado',
        'DELIVERED': 'Entregue',
        'CANCELLED': 'Cancelado',
        'REFUNDED': 'Reembolsado',
    };

    return statusMap[status] || status;
};

/**
 * Get order status color
 */
export const getOrderStatusColor = (status: string): string => {
    const colorMap: Record<string, string> = {
        'PENDING': '#FFC107',
        'CONFIRMED': '#17A2B8',
        'PROCESSING': '#007BFF',
        'SHIPPED': '#6F42C1',
        'DELIVERED': '#28A745',
        'CANCELLED': '#DC3545',
        'REFUNDED': '#6C757D',
    };

    return colorMap[status] || '#6C757D';
};

/**
 * Format relative time (ex: "há 2 horas")
 */
export const formatRelativeTime = (date: string | Date): string => {
    const now = new Date();
    const then = typeof date === 'string' ? new Date(date) : date;
    const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

    if (diffInSeconds < 60) return 'há alguns segundos';
    if (diffInSeconds < 3600) return `há ${Math.floor(diffInSeconds / 60)} minutos`;
    if (diffInSeconds < 86400) return `há ${Math.floor(diffInSeconds / 3600)} horas`;
    if (diffInSeconds < 604800) return `há ${Math.floor(diffInSeconds / 86400)} dias`;

    return formatDate(date);
};