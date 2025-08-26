import styled, { css, keyframes } from 'styled-components';
import { theme } from '../../../styles/theme';
import { mixins } from '../../../styles/mixins';

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

interface ButtonStyleProps {
    variant: 'primary' | 'secondary' | 'outline' | 'danger';
    size: 'small' | 'medium' | 'large';
    fullWidth: boolean;
}

const buttonSizes = {
    small: css`
        padding: ${theme.spacing[2]} ${theme.spacing[4]};
        font-size: ${theme.typography.fontSize.sm};
        min-height: 36px;
    `,
    medium: css`
        padding: ${theme.spacing[3]} ${theme.spacing[6]};
        font-size: ${theme.typography.fontSize.base};
        min-height: 44px;
    `,
    large: css`
        padding: ${theme.spacing[4]} ${theme.spacing[8]};
        font-size: ${theme.typography.fontSize.lg};
        min-height: 52px;
    `,
};

const buttonVariants = {
    primary: css`
        background: ${theme.colors.gradients.primary};
        color: ${theme.colors.neutral.white};
        border: 2px solid transparent;

        &:hover:not(:disabled) {
            background: ${theme.colors.primary.dark};
            transform: translateY(-1px);
            box-shadow: ${theme.shadows.lg};
        }
    `,
    secondary: css`
        background: ${theme.colors.secondary.main};
        color: ${theme.colors.primary.dark};
        border: 2px solid ${theme.colors.secondary.main};

        &:hover:not(:disabled) {
            background: ${theme.colors.secondary.main};
            color: ${theme.colors.neutral.white};
            transform: translateY(-1px);
        }
    `,
    outline: css`
        background: transparent;
        color: ${theme.colors.primary.main};
        border: 2px solid ${theme.colors.primary.main};

        &:hover:not(:disabled) {
            background: ${theme.colors.primary.main};
            color: ${theme.colors.neutral.white};
            transform: translateY(-1px);
        }
    `,
    danger: css`
        background: ${theme.colors.error};
        color: ${theme.colors.neutral.white};
        border: 2px solid ${theme.colors.error};

        &:hover:not(:disabled) {
            background: #c82333;
            border-color: #c82333;
            transform: translateY(-1px);
        }
    `,
};

export const StyledButton = styled.button<ButtonStyleProps>`
    ${mixins.buttonBase}
    ${mixins.flexCenter}
    
    width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
    border-radius: ${theme.borderRadius.md};
    font-family: ${theme.typography.fontFamily.primary};
    font-weight: ${theme.typography.fontWeight.semibold};
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    gap: ${theme.spacing[2]};
    position: relative;
    overflow: hidden;

    ${({ size }) => buttonSizes[size]}
    ${({ variant }) => buttonVariants[variant]}

    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none !important;
    }

    &:active:not(:disabled) {
        transform: translateY(0) !important;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 3px rgba(193, 24, 26, 0.2);
    }
`;

export const LoadingSpinner = styled.div<{ size: string }>`
    width: ${({ size }) => size === 'small' ? '16px' : size === 'large' ? '24px' : '20px'};
    height: ${({ size }) => size === 'small' ? '16px' : size === 'large' ? '24px' : '20px'};
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-right: ${theme.spacing[2]};
`;
