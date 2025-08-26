// frontend/src/index.tsx - VERSÃO CORRIGIDA
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/global';
import { ThemeProvider } from './contexts/ThemeContext';
import App from './App';
import './index.css';

// Verificar se o elemento root existe
const rootElement = document.getElementById('root');
if (!rootElement) {
    throw new Error(
        'Failed to find the root element. Make sure there is an element with id="root" in your HTML.'
    );
}

const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <StyledThemeProvider theme={theme}>
                    <GlobalStyles />
                    <App />
                </StyledThemeProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);

// Se você quiser usar web vitals, descomente as linhas abaixo
// import reportWebVitals from './reportWebVitals';
// reportWebVitals();