import React, { forwardRef } from 'react';
import { InputContainer, InputLabel, StyledInput, InputError } from './Input.styles';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, fullWidth, className, ...props }, ref) => {
        return (
            <InputContainer className={className}>
                {label && <InputLabel htmlFor={props.id}>{label}</InputLabel>}
                <StyledInput
                    ref={ref}
                    $fullWidth={fullWidth}
                    $hasError={!!error}
                    {...props}
                />
                {error && <InputError>{error}</InputError>}
            </InputContainer>
        );
    }
);

Input.displayName = 'Input';