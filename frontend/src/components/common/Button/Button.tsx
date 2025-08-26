import React from 'react';
import { StyledButton } from './Button.styles';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    fullWidth?: boolean;
    loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
                                                  children,
                                                  variant = 'primary',
                                                  size = 'medium',
                                                  fullWidth = false,
                                                  loading = false,
                                                  disabled,
                                                  ...props
                                              }) => {
    return (
        <StyledButton
            $variant={variant}
            $size={size}
            $fullWidth={fullWidth}
            $loading={loading}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? 'Carregando...' : children}
        </StyledButton>
    );
};