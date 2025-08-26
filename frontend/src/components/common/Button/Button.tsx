import React from 'react';
import { StyledButton, LoadingSpinner } from './Button.styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    size?: 'small' | 'medium' | 'large';
    loading?: boolean;
    fullWidth?: boolean;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
                                                  variant = 'primary',
                                                  size = 'medium',
                                                  loading = false,
                                                  fullWidth = false,
                                                  disabled,
                                                  children,
                                                  ...props
                                              }) => {
    return (
        <StyledButton
            variant={variant}
            size={size}
            fullWidth={fullWidth}
            disabled={disabled || loading}
            {...props}
        >
            {loading && <LoadingSpinner size={size} />}
            {children}
        </StyledButton>
    );
};
