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
            const isValid = await authService.validateToken(token);
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
            const userData = {
                username: response.username,
                fullName: response.fullName,
                email: response.email,
            };
            setUser(userData);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Login failed'
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