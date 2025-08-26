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
        'ROSA': '