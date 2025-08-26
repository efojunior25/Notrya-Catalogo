import styled from 'styled-components';

interface InputStyleProps {
    $fullWidth?: boolean;
    $hasError?: boolean;
}

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[2]};
`;

export const InputLabel = styled.label`
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
    color: ${({ theme }) => theme.colors.text.primary};
`;

export const StyledInput = styled.input<InputStyleProps>`
    width: ${({ $fullWidth }) => $fullWidth ? '100%' : 'auto'};
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
    border: 2px solid ${({ $hasError, theme }) =>
    $hasError ? theme.colors.primary.main : theme.colors.border.default
};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    font-family: ${({ theme }) => theme.typography.fontFamily.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    background: ${({ theme }) => theme.colors.background.primary};
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;

    &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.colors.primary.main};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary.main}20;
    }

    &:disabled {
        background: ${({ theme }) => theme.colors.background.secondary};
        color: ${({ theme }) => theme.colors.text.tertiary};
        cursor: not-allowed;
    }

    &::placeholder {
        color: ${({ theme }) => theme.colors.text.secondary};
    }
`;

export const InputError = styled.span`
    color: ${({ theme }) => theme.colors.primary.main};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    margin-top: ${({ theme }) => theme.spacing[1]};
`;