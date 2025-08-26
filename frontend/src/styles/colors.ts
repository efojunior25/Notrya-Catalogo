export const colors = {
    // Cores principais da marca NOTRYA
    primary: {
        main: '#C1181A',      // Vermelho principal
        dark: '#721526',      // Vermelho escuro
        light: '#E63946',     // Vermelho claro para hover
    },

    secondary: {
        main: '#CEB681',      // Dourado principal
        light: '#E6D5B4',     // Dourado claro
        lighter: '#F5ECDC',   // Dourado mais claro
    },

    // Cores neutras
    neutral: {
        white: '#FFFFFF',
        black: '#000000',
        gray: {
            50: '#F8F9FA',
            100: '#F1F3F4',
            200: '#E8EAED',
            300: '#DADCE0',
            400: '#BDC1C6',
            500: '#9AA0A6',
            600: '#80868B',
            700: '#5F6368',
            800: '#3C4043',
            900: '#202124',
        },
    },

    // Estados
    success: '#28A745',
    warning: '#FFC107',
    error: '#DC3545',
    info: '#17A2B8',

    // Gradientes
    gradients: {
        primary: 'linear-gradient(135deg, #C1181A 0%, #721526 100%)',
        secondary: 'linear-gradient(135deg, #CEB681 0%, #E6D5B4 100%)',
        hero: 'linear-gradient(135deg, #C1181A 0%, #721526 50%, #CEB681 100%)',
    },
} as const;