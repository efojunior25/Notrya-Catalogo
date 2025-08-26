// frontend/src/services/auth/AuthService.ts
import { LoginRequest, User } from '../../types';
import { apiClient } from '../api/client';

// Tipos específicos para AuthService
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

    async login(credentials: LoginRequest): Promise<AuthResponse<LoginResponse>> {
        try {
            const response = await apiClient.post<LoginResponse>('/auth/login', credentials);

            // Armazenar token e dados do usuário
            this.setToken(response.token);
            this.setUser({
                username: response.username,
                fullName: response.fullName,
                email: response.email,
            });

            return {
                success: true,
                data: response,
                message: 'Login realizado com sucesso'
            };
        } catch (error: any) {
            console.error('Erro no login:', error);

            let message = 'Erro desconhecido no login';
            if (error.response?.status === 401) {
                message = 'Credenciais inválidas';
            } else if (error.response?.status === 404) {
                message = 'Usuário não encontrado';
            } else if (error.message) {
                message = error.message;
            }

            return {
                success: false,
                message
            };
        }
    }

    async validateToken(): Promise<AuthResponse> {
        try {
            const token = this.getToken();
            if (!token) {
                return {
                    success: false,
                    message: 'Token não encontrado'
                };
            }

            await apiClient.post('/auth/validate');

            return {
                success: true,
                message: 'Token válido'
            };
        } catch (error: any) {
            console.error('Erro na validação do token:', error);

            // Limpar dados inválidos
            this.logout();

            return {
                success: false,
                message: 'Token inválido ou expirado'
            };
        }
    }

    logout(): void {
        try {
            localStorage.removeItem(this.TOKEN_KEY);
            localStorage.removeItem(this.USER_KEY);
        } catch (error) {
            console.warn('Erro ao fazer logout:', error);
        }
    }

    getCurrentUser(): User | null {
        try {
            const userJson = localStorage.getItem(this.USER_KEY);
            if (!userJson) return null;

            return JSON.parse(userJson) as User;
        } catch (error) {
            console.error('Erro ao recuperar usuário:', error);
            return null;
        }
    }

    getToken(): string | null {
        try {
            return localStorage.getItem(this.TOKEN_KEY);
        } catch (error) {
            console.error('Erro ao recuperar token:', error);
            return null;
        }
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        const user = this.getCurrentUser();
        return !!(token && user);
    }

    // Métodos privados para facilitar manutenção
    private setToken(token: string): void {
        try {
            localStorage.setItem(this.TOKEN_KEY, token);
        } catch (error) {
            console.error('Erro ao salvar token:', error);
            throw new Error('Não foi possível salvar o token de autenticação');
        }
    }

    private setUser(user: User): void {
        try {
            localStorage.setItem(this.USER_KEY, JSON.stringify(user));
        } catch (error) {
            console.error('Erro ao salvar usuário:', error);
            throw new Error('Não foi possível salvar os dados do usuário');
        }
    }

    // Método para refresh de token (se necessário no futuro)
    async refreshToken(): Promise<AuthResponse<LoginResponse>> {
        try {
            const response = await apiClient.post<LoginResponse>('/auth/refresh');

            this.setToken(response.token);

            return {
                success: true,
                data: response,
                message: 'Token renovado com sucesso'
            };
        } catch (error: any) {
            console.error('Erro ao renovar token:', error);

            this.logout();

            return {
                success: false,
                message: 'Não foi possível renovar o token'
            };
        }
    }
}

export const authService = new AuthService();