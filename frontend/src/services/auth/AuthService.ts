import { LoginRequest, User } from '../../types';
import { apiClient } from '../api/client';
import { jwtDecode } from 'jwt-decode';

export interface LoginResponse {
    token: string;
    type: string;
    username: string;
    fullName: string;
    email: string;
}

export interface AuthResponse<T = any> {
    success: boolean;
    data?: T;
    message: string;
}

export interface IAuthService {
    login(credentials: LoginRequest): Promise<AuthResponse<LoginResponse>>;
    logout(): void;
    validateToken(): Promise<AuthResponse>;
    getCurrentUser(): User | null;
    getToken(): string | null;
    isAuthenticated(): boolean;
}

class AuthService implements IAuthService {
    private readonly TOKEN_KEY = 'token';
    private readonly USER_KEY = 'user';

    private isTokenValid(token: string): boolean {
        try {
            // @ts-ignore
            const decoded = jwtDecode<{ exp?: number }>(token);
            if (!decoded.exp) return false;

            const currentTime = Date.now() / 1000; // segundos
            return decoded.exp > currentTime;
        } catch (error) {
            console.error('Invalid JWT token:', error);
            return false;
        }
    }

    async login(credentials: LoginRequest): Promise<AuthResponse<LoginResponse>> {
        try {
            const response = await apiClient.post<LoginResponse>('/auth/login', credentials);

            // ✅ Valida token antes de salvar
            if (!this.isTokenValid(response.token)) {
                console.warn('Token inválido ou expirado recebido do backend');
                return {
                    success: false,
                    message: 'Token inválido ou expirado. Tente novamente.'
                };
            }

            this.setToken(response.token);
            this.setUser({
                username: response.username,
                fullName: response.fullName,
                email: response.email,
            });

            return {
                success: true,
                data: response,
                message: 'Login realizado com sucesso',
            };
        } catch (error: any) {
            console.error('Erro no login:', error);
            let message = 'Erro desconhecido no login';
            if (error.response?.status === 401) {
                message = 'Usuário ou senha inválidos';
            } else if (error.response?.data?.message) {
                message = error.response.data.message;
            }
            return { success: false, message };
        }
    }

    // ✅ Melhoria opcional — validar token armazenado
    getToken(): string | null {
        const token = localStorage.getItem(this.TOKEN_KEY);
        if (token && this.isTokenValid(token)) {
            return token;
        }
        localStorage.removeItem(this.TOKEN_KEY);
        return null;
    }

    logout(): void {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_KEY);
    }

    setToken(token: string): void {
        localStorage.setItem(this.TOKEN_KEY, token);
    }

    setUser(user: User): void {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }

    getCurrentUser(): User | null {
        const user = localStorage.getItem(this.USER_KEY);
        return user ? JSON.parse(user) : null;
    }

    isAuthenticated(): boolean {
        return !!this.getToken();
    }

    async validateToken(): Promise<AuthResponse> {
        const token = this.getToken();
        if (!token) {
            return { success: false, message: 'Token inválido ou expirado' };
        }
        return { success: true, message: 'Token válido' };
    }
}

export const authService = new AuthService();
