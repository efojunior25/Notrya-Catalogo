import { apiClient } from './client';

export class ApiInterceptors {
    static setupRequestInterceptor() {
        // This would be implemented if using axios or similar
        // For now, token handling is done in the ApiClient class
    }

    static setupResponseInterceptor() {
        // Handle token refresh, logout on 401, etc.
        // This would be implemented if using axios or similar
    }

    static handleTokenExpiry() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
    }
}