export interface User {
    id: number;
    email: string;
    fullName: string;
    role: 'ADMIN' | 'USER';
    createdAt: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    fullName: string;
    password: string;
}
