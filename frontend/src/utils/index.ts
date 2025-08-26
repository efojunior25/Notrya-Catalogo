import { API_ENDPOINTS } from './constants';

export {
    formatPrice,
    formatNumber,
    formatDate,
    formatDateTime,
    formatCategory,
    formatSize,
    formatColor,
    formatGender,
    formatMaterial,
    formatStock,
    getStockStatus,
    truncateText,
    capitalizeWords,
    formatFileSize,
    formatPercentage,
    formatOrderStatus,
    getOrderStatusColor,
    formatRelativeTime,
} from './formatters';

// Constants
export {
    API_ENDPOINTS,
    PRODUCT_CATEGORIES,
    PRODUCT_SIZES,
    PRODUCT_COLORS,
    PRODUCT_GENDERS,
    PRODUCT_MATERIALS,
    ORDER_STATUSES,
    PAGINATION,
    VALIDATION_RULES,
    LOCAL_STORAGE_KEYS,
    MESSAGES,
} from './constants';

// Validators
export {
    type ValidationResult,
    validateEmail,
    validatePassword,
    validateUsername,
    validateProductName,
    validatePrice,
    validateStock,
    validateFile,
    validateRequired,
    validateCategory,
    validateProductForm,
} from './validators';

// Helper functions
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;

    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
};

export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    delay: number
): ((...args: Parameters<T>) => void) => {
    let lastCall = 0;

    return (...args: Parameters<T>) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func.apply(null, args);
        }
    };
};

export const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const sleep = (ms: number): Promise<void> => {
    return new Promise(resolve => setTimeout(resolve, ms));
};

export const isClient = (): boolean => {
    return typeof window !== 'undefined';
};

export const getImageUrl = (imageUrl?: string, baseUrl?: string): string => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;

    const base = baseUrl || API_ENDPOINTS.IMAGES_URL;
    return `${base}${imageUrl}`;
};


export const copyToClipboard = async (text: string): Promise<boolean> => {
    try {
        if (navigator.clipboard) {
            await navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
        return true;
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        return false;
    }
};

export const scrollToTop = (smooth: boolean = true): void => {
    window.scrollTo({
        top: 0,
        behavior: smooth ? 'smooth' : 'auto'
    });
};

export const isValidUrl = (url: string): boolean => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

export const parseQueryString = (search: string): Record<string, string> => {
    const params = new URLSearchParams(search);
    const result: Record<string, string> = {};

    // Usar Array.from para compatibilidade
    Array.from(params.entries()).forEach(([key, value]) => {
        result[key] = value;
    });

    return result;
};


export const buildQueryString = (params: Record<string, any>): string => {
    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value));
        }
    });

    return searchParams.toString();
};