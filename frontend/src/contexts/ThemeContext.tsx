import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    mode: ThemeMode;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

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
            // Override colors based on theme mode
            ...(mode === 'dark' && {
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
            }),
        },
    };

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <StyledThemeProvider theme={currentTheme}>
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