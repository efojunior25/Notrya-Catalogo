export const endpoints = {
    // Products
    products: {
        getAll: '/products',
        getById: (id: number) => `/products/${id}`,
        create: '/admin/products',
        update: (id: number) => `/admin/products/${id}`,
        delete: (id: number) => `/admin/products/${id}`,
    },

    // Orders
    orders: {
        create: '/orders',
        getById: (id: number) => `/orders/${id}`,
        getAll: '/orders',
    },

    // Auth
    auth: {
        login: '/auth/login',
        validate: '/auth/validate',
        refresh: '/auth/refresh',
    },

    // Upload
    upload: {
        image: '/upload/image',
        deleteImage: (filename: string) => `/upload/image/${filename}`,
    },
} as const;