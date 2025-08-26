// frontend/src/styles/theme.ts
export const theme = {
    colors: {
        primary: {
            main: '#C1181A',
            dark: '#721526',
            light: '#E63946',
        },
        secondary: {
            main: '#CEB681',
            light: '#E6D5B4',
            lighter: '#F5ECDC',
        },
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
            default: '#E8EAED',
            light: '#F1F3F4',
        },
        error: '#DC3545',
        warning: '#FFC107',
        success: '#28A745',
        info: '#17A2B8',
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
        gradients: {
            primary: 'linear-gradient(135deg, #C1181A 0%, #721526 100%)',
            secondary: 'linear-gradient(135deg, #CEB681 0%, #E6D5B4 100%)',
            hero: 'linear-gradient(135deg, #C1181A 0%, #721526 50%, #CEB681 100%)',
        },
    },
    typography: {
        fontFamily: {
            primary: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            secondary: "'Formula Condensed', 'Montserrat', sans-serif",
        },
        fontSize: {
            xs: '0.75rem',      // 12px
            sm: '0.875rem',     // 14px
            base: '1rem',       // 16px
            lg: '1.125rem',     // 18px
            xl: '1.25rem',      // 20px
            '2xl': '1.5rem',    // 24px
            '3xl': '1.875rem',  // 30px
            '4xl': '2.25rem',   // 36px
            '5xl': '3rem',      // 48px
        },
        fontWeight: {
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
        },
        lineHeight: {
            tight: '1.2',
            normal: '1.5',
            relaxed: '1.7',
            loose: '2',
        },
    },
    borderRadius: {
        base: '4px',
        sm: '6px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
    },
    shadows: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
        base: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.25)',
    },
    spacing: {
        0: '0',
        1: '0.25rem',    // 4px
        2: '0.5rem',     // 8px
        3: '0.75rem',    // 12px
        4: '1rem',       // 16px
        5: '1.25rem',    // 20px
        6: '1.5rem',     // 24px
        7: '1.75rem',    // 28px
        8: '2rem',       // 32px
        9: '2.25rem',    // 36px
        10: '2.5rem',    // 40px
        12: '3rem',      // 48px
        16: '4rem',      // 64px
        20: '5rem',      // 80px
        24: '6rem',      // 96px
        32: '8rem',      // 128px
    },
    breakpoints: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
    },
    zIndex: {
        hide: -1,
        auto: 'auto',
        base: 0,
        docked: 10,
        dropdown: 1000,
        sticky: 1100,
        banner: 1200,
        overlay: 1300,
        modal: 1400,
        popover: 1500,
        skipLink: 1600,
        toast: 1700,
        tooltip: 1800,
    },
    transition: {
        duration: {
            fastest: '100ms',
            faster: '150ms',
            fast: '200ms',
            normal: '300ms',
            slow: '400ms',
            slower: '500ms',
            slowest: '1000ms',
        },
        easing: {
            linear: 'linear',
            in: 'cubic-bezier(0.4, 0, 1, 1)',
            out: 'cubic-bezier(0, 0, 0.2, 1)',
            inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
            bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        },
    },
} as const;

export type Theme = typeof theme;

// Utility types for better TypeScript support
export type Colors = typeof theme.colors;
export type Spacing = keyof typeof theme.spacing;
export type FontSize = keyof typeof theme.typography.fontSize;
export type FontWeight = keyof typeof theme.typography.fontWeight;
export type BorderRadius = keyof typeof theme.borderRadius;
export type Shadow = keyof typeof theme.shadows;
export type Breakpoint = keyof typeof theme.breakpoints;