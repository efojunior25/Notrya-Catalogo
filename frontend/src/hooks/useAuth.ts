import { useState, useEffect } from 'react';
import { User, LoginRequest } from '../types';
import { authService } from '../services';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initializeAuth();
    }, []);

    const initializeAuth = async () => {
        const token = authService.getToken();
        if (token) {
            const isValid = await authService.validateToken();
            if (isValid) {
                const userData = authService.getCurrentUser();
                setUser(userData);
                setIsAuthenticated(true);
            }
        }
        setIsLoading(false);
    };

    const login = async (credentials: LoginRequest) => {
        setIsLoading(true);
        try {
            const response = await authService.login(credentials);
        
        // Verificar se o login foi bem-sucedido
        if (!response.success) {
            return {
                success: false,
                error: response.message || 'Falha no login'
            };
        }

        // Validar se os dados necessários estão presentes
        if (!response.data) {
            return {
                success: false,
                error: 'Dados de usuário não recebidos do servidor'
            };
        }

        // Extrair dados do usuário
        const userData = {
            username: response.data.username,
            fullName: response.data.fullName,
            email: response.data.email,
        };

        // Verificar se todos os campos obrigatórios estão presentes
        if (!userData.username || !userData.fullName || !userData.email) {
            return {
                success: false,
                error: 'Dados de usuário incompletos recebidos do servidor'
            };
        }

        setUser(userData);
        setIsAuthenticated(true);
        return { success: true };

    } catch (error) {
        // Este catch pode nunca ser executado se authService.login nunca lançar exceções
        console.error('Erro inesperado no login:', error);
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Erro interno no login'
        };
    } finally {
        setIsLoading(false);
    }
};

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };
};