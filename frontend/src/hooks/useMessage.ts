import { useState, useCallback } from 'react';
import { Message } from '../types';

export const useMessage = () => {
    const [message, setMessage] = useState<Message | null>(null);

    const showMessage = useCallback((
        type: Message['type'],
        content: string,
        duration: number = 5000
    ) => {
        setMessage({ type, content, duration });

        if (duration > 0) {
            setTimeout(() => {
                setMessage(null);
            }, duration);
        }
    }, []);

    const showSuccess = useCallback((content: string, duration?: number) => {
        showMessage('success', content, duration);
    }, [showMessage]);

    const showError = useCallback((content: string, duration?: number) => {
        showMessage('error', content, duration);
    }, [showMessage]);

    const showWarning = useCallback((content: string, duration?: number) => {
        showMessage('warning', content, duration);
    }, [showMessage]);

    const showInfo = useCallback((content: string, duration?: number) => {
        showMessage('info', content, duration);
    }, [showMessage]);

    const clearMessage = useCallback(() => {
        setMessage(null);
    }, []);

    return {
        message,
        showMessage,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        clearMessage,
    };
};