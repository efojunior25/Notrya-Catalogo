import { LoginRequest, LoginResponse, User } from '../../types';
import { apiClient } from '../api/client';

export interface IAuthService {
    login(credentials: LoginRequest): Promise<LoginResponse>;
    logout(): void;
    validateToken(token: string): Promise<boolean>;
    getCurrentUser(): User | null;
    getToken(): string | null;
    isAuthenticated(): boolean;
}

class AuthService implements IAuthService {
    async login(credentials: LoginRequest): Promise<LoginResponse> {
        const response = await apiClient.post<LoginResponse>('/auth/login', credentials);

        // Store auth data
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify({
            username: response.username,
            fullName: response.fullName,
            email: response.email,
        }));

        return response;
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    async validateToken(token: string): Promise<boolean> {
        try {
            await apiClient.post('/auth/validate');
            return true;
        } catch {
            this.logout();
            return false;
        }
    }

    getCurrentUser(): User | null {
        const userJson = localStorage.getItem('user');
        return userJson ? JSON.parse(userJson) : null;
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return this.getToken() !== null;
    }
}

export const authService = new AuthService();