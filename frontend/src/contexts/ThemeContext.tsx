
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// Definir cores específicas para cada modo
const themeColors = {
    light: {
        background: {
            primary: '#FFFFFF',
            secondary: '#F8F9FA',
            tertiary: '#F1F3F4',
        },
        text: {
            primary: '#202124',
            secondary: '#5F6368',
            tertiary: '#80868B',
        },
        border: {
            default: '#DADCE0',
            light: '#E8EAED',
        },
    },
    dark: {
        background: {
            primary: '#1a1a1a',
            secondary: '#2d2d2d',
            tertiary: '#404040',
        },
        text: {
            primary: '#ffffff',
            secondary: '#cccccc',
            tertiary: '#999999',
        },
        border: {
            default: '#404040',
            light: '#555555',
        },
    },
} as const;

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [mode, setMode] = useState<ThemeMode>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('notrya_theme') as ThemeMode;
        if (savedTheme) {
            setMode(savedTheme);
        } else {
            // Check system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setMode(prefersDark ? 'dark' : 'light');
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('notrya_theme', mode);
        document.documentElement.setAttribute('data-theme', mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
    };

    const currentTheme = {
        ...theme,
        colors: {
            ...theme.colors,
            ...themeColors[mode],
        },
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <StyledThemeProvider theme={currentTheme as any}>
                {children}
            </StyledThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};