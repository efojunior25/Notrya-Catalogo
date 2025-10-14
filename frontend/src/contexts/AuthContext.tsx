import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { User, LoginRequest, ApiResponse, LoginResponse } from '../types';
import { authService } from '../services/auth/AuthService';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

type AuthAction =
    | { type: 'AUTH_START' }
    | { type: 'AUTH_SUCCESS'; payload: User }
    | { type: 'AUTH_ERROR'; payload: string }
    | { type: 'LOGOUT' }
    | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

const AuthContext = createContext<{
    state: AuthState;
    login: (credentials: LoginRequest) => Promise<boolean>;
    logout: () => void;
    clearError: () => void;
} | null>(null);

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'AUTH_START':
            return {
                ...state,
                isLoading: true,
                error: null,
            };
        case 'AUTH_SUCCESS':
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
                isLoading: false,
                error: null,
            };
        case 'AUTH_ERROR':
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                ...initialState,
            };
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: null,
            };
        default:
            return state;
    }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = authService.getToken();
                if (token) {
                    dispatch({ type: 'AUTH_START' });
                    const response = await authService.validateToken();

                    if (response.success) {
                        const user = authService.getCurrentUser();
                        if (user) {
                            dispatch({ type: 'AUTH_SUCCESS', payload: user });
                        } else {
                            dispatch({ type: 'LOGOUT' });
                        }
                    } else {
                        authService.logout();
                        dispatch({ type: 'LOGOUT' });
                    }
                }
            } catch (error) {
                console.error('Auth initialization failed:', error);
                authService.logout();
                dispatch({ type: 'LOGOUT' });
            }
        };

        initAuth();
    }, []);

    const sanitizeErrorMessage = (error: any): string => {
        const message = error?.message || 'Erro desconhecido';

        const sanitized = message
            .replace(/https?:\/\/[^\s]+/g, '[URL removida]')
            .replace(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/g, '[IP removido]');

        if (process.env.NODE_ENV === 'production') {
            return 'Erro ao processar sua solicitação. Tente novamente.';
        }

        return sanitized;
    };

    const login = async (credentials: LoginRequest): Promise<boolean> => {
        dispatch({ type: 'AUTH_START' });

        const response = await authService.login(credentials);

        if (response.success && response.data) {
            const user: User = {
                username: response.data.username,
                fullName: response.data.fullName,
                email: response.data.email,
            };
            dispatch({ type: 'AUTH_SUCCESS', payload: user });
            return true;
        } else {
            dispatch({ type: 'AUTH_ERROR', payload: sanitizeErrorMessage(response) });
            return false;
        }
    };

    const logout = () => {
        authService.logout();
        dispatch({ type: 'LOGOUT' });
    };

    const clearError = () => {
        dispatch({ type: 'CLEAR_ERROR' });
    };

    return (
        <AuthContext.Provider value={{ state, login, logout, clearError }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};