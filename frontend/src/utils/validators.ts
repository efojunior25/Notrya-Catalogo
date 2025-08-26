import { VALIDATION_RULES, PRODUCT_CATEGORIES } from './constants';

export interface ValidationResult {
    isValid: boolean;
    message?: string;
}

/**
 * Validates email format
 */
export const validateEmail = (email: string): ValidationResult => {
    if (!email) {
        return { isValid: false, message: 'Email é obrigatório' };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return { isValid: false, message: 'Email inválido' };
    }

    return { isValid: true };
};

/**
 * Validates password strength
 */
export const validatePassword = (password: string): ValidationResult => {
    if (!password) {
        return { isValid: false, message: 'Senha é obrigatória' };
    }

    if (password.length < VALIDATION_RULES.PASSWORD_MIN_LENGTH) {
        return {
            isValid: false,
            message: `Senha deve ter pelo menos ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} caracteres`
        };
    }

    return { isValid: true };
};

/**
 * Validates username
 */
export const validateUsername = (username: string): ValidationResult => {
    if (!username) {
        return { isValid: false, message: 'Nome de usuário é obrigatório' };
    }

    if (username.length < VALIDATION_RULES.USERNAME_MIN_LENGTH) {
        return {
            isValid: false,
            message: `Nome de usuário deve ter pelo menos ${VALIDATION_RULES.USERNAME_MIN_LENGTH} caracteres`
        };
    }


    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    if (!usernameRegex.test(username)) {
        return {
            isValid: false,
            message: 'Nome de usuário pode conter apenas letras, números e underscore'
        };
    }

    return { isValid: true };
};

/**
 * Validates product name
 */
export const validateProductName = (name: string): ValidationResult => {
    if (!name || !name.trim()) {
        return { isValid: false, message: 'Nome do produto é obrigatório' };
    }

    const trimmedName = name.trim();

    if (trimmedName.length < VALIDATION_RULES.PRODUCT_NAME_MIN_LENGTH) {
        return {
            isValid: false,
            message: `Nome deve ter pelo menos ${VALIDATION_RULES.PRODUCT_NAME_MIN_LENGTH} caracteres`
        };
    }

    if (trimmedName.length > VALIDATION_RULES.PRODUCT_NAME_MAX_LENGTH) {
        return {
            isValid: false,
            message: `Nome não pode exceder ${VALIDATION_RULES.PRODUCT_NAME_MAX_LENGTH} caracteres`
        };
    }

    return { isValid: true };
};

/**
 * Validates product price
 */
export const validatePrice = (price: number | string): ValidationResult => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;

    if (isNaN(numPrice) || numPrice <= 0) {
        return { isValid: false, message: 'Preço deve ser um valor positivo' };
    }

    if (numPrice > 999999.99) {
        return { isValid: false, message: 'Preço muito alto' };
    }

    return { isValid: true };
};

/**
 * Validates stock quantity
 */
export const validateStock = (stock: number | string): ValidationResult => {
    const numStock = typeof stock === 'string' ? parseInt(stock) : stock;

    if (isNaN(numStock) || numStock < 0) {
        return { isValid: false, message: 'Estoque deve ser um número não negativo' };
    }

    if (numStock > 999999) {
        return { isValid: false, message: 'Quantidade de estoque muito alta' };
    }

    return { isValid: true };
};

/**
 * Validates file for upload
 */
export const validateFile = (file: File): ValidationResult => {
    if (!file) {
        return { isValid: false, message: 'Nenhum arquivo selecionado' };
    }

    // Check file size
    if (file.size > VALIDATION_RULES.MAX_FILE_SIZE) {
        return {
            isValid: false,
            message: `Arquivo muito grande. Máximo ${VALIDATION_RULES.MAX_FILE_SIZE / (1024 * 1024)}MB`
        };
    }

    // Check file type
    // @ts-ignore
    if (!VALIDATION_RULES.ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return {
            isValid: false,
            message: 'Tipo de arquivo não permitido. Use JPG, PNG, GIF ou WebP'
        };
    }


    return { isValid: true };
};

/**
 * Validates required field
 */
export const validateRequired = (value: any, fieldName: string): ValidationResult => {
    if (!value || (typeof value === 'string' && !value.trim())) {
        return { isValid: false, message: `${fieldName} é obrigatório` };
    }

    return { isValid: true };
};

/**
 * Validates product category
 */
export const validateCategory = (category: string): ValidationResult => {
    if (!category) {
        return { isValid: false, message: 'Categoria é obrigatória' };
    }

    if (!PRODUCT_CATEGORIES.includes(category as any)) {
        return { isValid: false, message: 'Categoria inválida' };
    }

    return { isValid: true };
};

/**
 * Validates product form data
 */
export const validateProductForm = (data: any): { isValid: boolean; errors: Record<string, string> } => {
    const errors: Record<string, string> = {};

    // Name validation
    const nameValidation = validateProductName(data.name);
    if (!nameValidation.isValid) {
        errors.name = nameValidation.message!;
    }

    // Price validation
    const priceValidation = validatePrice(data.price);
    if (!priceValidation.isValid) {
        errors.price = priceValidation.message!;
    }

    // Stock validation
    const stockValidation = validateStock(data.stock);
    if (!stockValidation.isValid) {
        errors.stock = stockValidation.message!;
    }

    // Category validation
    const categoryValidation = validateCategory(data.category);
    if (!categoryValidation.isValid) {
        errors.category = categoryValidation.message!;
    }

    // Required fields
    const requiredFields = ['size', 'color', 'gender'];
    requiredFields.forEach(field => {
        const validation = validateRequired(data[field], field);
        if (!validation.isValid) {
            errors[field] = validation.message!;
        }
    });

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};