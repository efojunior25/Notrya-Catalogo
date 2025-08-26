import styled from 'styled-components';

interface ButtonStyleProps {
    $variant: 'primary' | 'secondary' | 'outline' | 'ghost';
    $size: 'small' | 'medium' | 'large';
    $fullWidth: boolean;
    $loading: boolean;
}

const getSizeStyles = (size: ButtonStyleProps['$size']) => {
    const sizes = {
        small: {
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
        },
        medium: {
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
        },
        large: {
            padding: '1rem 2rem',
            fontSize: '1.125rem',
        },
    };
    return sizes[size];
};

const getVariantStyles = (variant: ButtonStyleProps['$variant'], theme: any) => {
    const variants = {
        primary: {
            background: theme.colors.primary.main,
            color: '#ffffff',
            border: `2px solid ${theme.colors.primary.main}`,
            '&:hover': {
                background: theme.colors.primary.dark,
                borderColor: theme.colors.primary.dark,
            },
        },
        secondary: {
            background: theme.colors.secondary.main,
            color: theme.colors.text.primary,
            border: `2px solid ${theme.colors.secondary.main}`,
            '&:hover': {
                background: theme.colors.secondary.light,
            },
        },
        outline: {
            background: 'transparent',
            color: theme.colors.primary.main,
            border: `2px solid ${theme.colors.primary.main}`,
            '&:hover': {
                background: theme.colors.primary.main,
                color: '#ffffff',
            },
        },
        ghost: {
            background: 'transparent',
            color: theme.colors.primary.main,
            border: '2px solid transparent',
            '&:hover': {
                background: theme.colors.background.secondary,
            },
        },
    };
    return variants[variant];
};

export const StyledButton = styled.button<ButtonStyleProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    opacity: ${({ $loading }) => $loading ? 0.7 : 1};
    
    ${({ $size }) => {
    const sizeStyles = getSizeStyles($size);
    return `
            padding: ${sizeStyles.padding};
            font-size: ${sizeStyles.fontSize};
        `;
}}
    
    ${({ $variant, theme }) => {
    const variantStyles = getVariantStyles($variant, theme);
    return `
            background: ${variantStyles.background};
            color: ${variantStyles.color};
            border: ${variantStyles.border};
        `;
}}
    
    &:hover:not(:disabled) {
        ${({ $variant, theme }) => {
    const variantStyles = getVariantStyles($variant, theme);
    return variantStyles['&:hover'];
}}
    }
    
    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }
`;