import { colors } from './colors';

export const theme = {
    colors: {
        primary: {
            main: '#1f6feb',
            dark: '#1158c7',
        },
        background: {
            primary: '#ffffff',
            secondary: '#f7f7f8',
            tertiary: '#ececf1',
        },
        text: {
            primary: '#111827',
            secondary: '#6b7280',
            tertiary: '#9ca3af',
        },
        border: {
            default: '#e5e7eb',
            light: '#e5e7eb',
        },
        error: '#ef4444',
        warning: '#f59e0b',
        neutral: {
            gray: {
                200: '#e5e7eb',
            },
        },
    },
    borderRadius: {
        md: '8px',
        lg: '12px',
    },
    shadows: {
        sm: '0 1px 2px rgba(0,0,0,0.05)',
        lg: '0 10px 15px rgba(0,0,0,0.1)',
    },
} as const;

export type Theme = typeof theme;
