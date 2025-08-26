import React from 'react';
import {
    InputContainer,
    Label,
    StyledInput,
    ErrorMessage,
    HelperText,
} from './Input.styles';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
    fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
                                                label,
                                                error,
                                                helperText,
                                                fullWidth = false,
                                                id,
                                                className,
                                                ...props
                                            }) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <InputContainer className={className} fullWidth={fullWidth}>
            {label && (
                <Label htmlFor={inputId} hasError={!!error}>
                    {label}
                </Label>
            )}
            <StyledInput
                id={inputId}
                hasError={!!error}
                fullWidth={fullWidth}
                {...props}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {helperText && !error && <HelperText>{helperText}</HelperText>}
        </InputContainer>
    );
};
