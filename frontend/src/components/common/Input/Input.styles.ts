import styled from 'styled-components';
import { theme } from '../../../styles/theme';

interface InputStyleProps {
    hasError: boolean;
    fullWidth: boolean;
}

export const InputContainer = styled.div<{ fullWidth: boolean }>`
    display: flex;
    flex-direction: column;
    gap: ${theme.spacing[1]};
    width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
`;

export const Label = styled.label<{ hasError: boolean }>`
    font-family: ${theme.typography.fontFamily.primary};
    font-weight: ${theme.typography.fontWeight.medium};
    font-size: ${theme.typography.fontSize.sm};
    color: ${({ hasError }) =>
            hasError ? theme.colors.error : theme.colors.neutral.gray[700]};
    margin-bottom: ${theme.spacing[1]};
`;

export const StyledInput = styled.input<InputStyleProps>`
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
    border: 2px solid ${({ hasError }) =>
            hasError ? theme.colors.error : theme.colors.neutral.gray[300]};
    border-radius: ${theme.borderRadius.md};
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.base};
    background-color: ${theme.colors.neutral.white};
    transition: all 0.2s ease-in-out;
    width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: ${({ hasError }) =>
                hasError ? theme.colors.error : theme.colors.primary.main};
        box-shadow: 0 0 0 3px ${({ hasError }) =>
                hasError ? 'rgba(220, 53, 69, 0.1)' : 'rgba(193, 24, 26, 0.1)'};
    }

    &:disabled {
        background-color: ${theme.colors.neutral.gray[100]};
        color: ${theme.colors.neutral.gray[500]};
        cursor: not-allowed;
    }

    &::placeholder {
        color: ${theme.colors.neutral.gray[400]};
    }
`;

export const ErrorMessage = styled.span`
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.error};
    margin-top: ${theme.spacing[1]};
`;

export const HelperText = styled.span`
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.neutral.gray[500]};
    margin-top: ${theme.spacing[1]};
`;
