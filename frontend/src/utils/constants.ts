export const API_ENDPOINTS = {
    BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:8080/api/v1',
    IMAGES_URL: process.env.REACT_APP_BASE_URL || 'http://localhost:8080',

    // Auth endpoints
    AUTH: {
        LOGIN: '/auth/login',
        VALIDATE: '/auth/validate',
        REFRESH: '/auth/refresh',
    },

    // Product endpoints
    PRODUCTS: {
        LIST: '/products',
        CREATE: '/admin/products',
        UPDATE: (id: number) => `/admin/products/${id}`,
        DELETE: (id: number) => `/admin/products/${id}`,
        BY_ID: (id: number) => `/products/${id}`,
    },

    // Order endpoints
    ORDERS: {
        CREATE: '/orders',
        LIST: '/orders',
        BY_ID: (id: number) => `/orders/${id}`,
    },

    // Upload endpoints
    UPLOAD: {
        IMAGE: '/upload/image',
        DELETE_IMAGE: (filename: string) => `/upload/image/${filename}`,
    },
} as const;

export const PRODUCT_CATEGORIES = [
    'CAMISETA', 'CALCA', 'BERMUDA', 'SHORTS', 'VESTIDO', 'SAIA',
    'BLUSA', 'JAQUETA', 'CASACO', 'TENIS', 'SAPATO', 'SANDALIA',
    'BONE', 'CHAPEU', 'BOLSA', 'MOCHILA', 'CARTEIRA', 'CINTO'
] as const;

export const PRODUCT_SIZES = [
    'PP', 'P', 'M', 'G', 'GG', 'XG', 'XXG',
    'TAMANHO_34', 'TAMANHO_36', 'TAMANHO_38', 'TAMANHO_40',
    'TAMANHO_42', 'TAMANHO_44', 'TAMANHO_46', 'TAMANHO_48',
    'UNICO'
] as const;

export const PRODUCT_COLORS = [
    'AZUL', 'PRETO', 'BRANCO', 'VERMELHO', 'VERDE', 'AMARELO',
    'ROSA', 'ROXO', 'LARANJA', 'MARROM', 'CINZA', 'BEGE',
    'NAVY', 'VINHO', 'CREME', 'DOURADO', 'PRATEADO', 'MULTICOLOR'
] as const;

export const PRODUCT_GENDERS = ['MASCULINO', 'FEMININO', 'UNISSEX'] as const;

export const PRODUCT_MATERIALS = [
    'ALGODAO', 'POLIESTER', 'VISCOSE', 'ELASTANO', 'LINHO',
    'LA', 'SEDA', 'DENIM', 'COURO', 'SINTETICO', 'MISTO',
    'NYLON', 'LYCRA', 'CASHMERE', 'MODAL'
] as const;

export const ORDER_STATUSES = [
    'PENDING', 'CONFIRMED', 'PROCESSING', 'SHIPPED',
    'DELIVERED', 'CANCELLED', 'REFUNDED'
] as const;

export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 6,
    ADMIN_PAGE_SIZE: 12,
    MAX_PAGE_SIZE: 50,
} as const;

export const VALIDATION_RULES = {
    PASSWORD_MIN_LENGTH: 6,
    USERNAME_MIN_LENGTH: 3,
    PRODUCT_NAME_MIN_LENGTH: 2,
    PRODUCT_NAME_MAX_LENGTH: 100,
    PRODUCT_DESCRIPTION_MAX_LENGTH: 500,
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
} as const;

export const LOCAL_STORAGE_KEYS = {
    TOKEN: 'token',
    USER: 'user',
    CART: 'cart',
    THEME: 'notrya_theme',
} as const;

export const MESSAGES = {
    SUCCESS: {
        LOGIN: 'Login realizado com sucesso!',
        LOGOUT: 'Logout realizado com sucesso!',
        PRODUCT_CREATED: 'Produto criado com sucesso!',
        PRODUCT_UPDATED: 'Produto atualizado com sucesso!',
        PRODUCT_DELETED: 'Produto excluído com sucesso!',
        ADDED_TO_CART: 'Produto adicionado ao carrinho!',
        ORDER_CREATED: 'Pedido realizado com sucesso!',
    },
    ERROR: {
        GENERIC: 'Ops! Algo deu errado. Tente novamente.',
        NETWORK: 'Erro de conexão. Verifique sua internet.',
        LOGIN_FAILED: 'Credenciais inválidas. Tente novamente.',
        UNAUTHORIZED: 'Você não tem permissão para esta ação.',
        NOT_FOUND: 'Item não encontrado.',
        VALIDATION: 'Por favor, preencha todos os campos obrigatórios.',
        FILE_TOO_LARGE: 'Arquivo muito grande. Máximo 5MB.',
        INVALID_FILE_TYPE: 'Tipo de arquivo inválido.',
        OUT_OF_STOCK: 'Produto fora de estoque.',
        CART_EMPTY: 'Seu carrinho está vazio.',
    },
    CONFIRMATION: {
        DELETE_PRODUCT: 'Tem certeza que deseja excluir este produto?',
        REMOVE_FROM_CART: 'Deseja remover este item do carrinho?',
        CLEAR_CART: 'Deseja limpar todo o carrinho?',
        LOGOUT: 'Deseja fazer logout?',
    },
} as const;