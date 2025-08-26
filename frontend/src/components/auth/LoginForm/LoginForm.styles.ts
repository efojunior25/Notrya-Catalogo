import styled from 'styled-components';

export const FormWrapper = styled.div`
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    background: ${({ theme }) => theme.colors.background.secondary};
    border: 1px solid ${({ theme }) => theme.colors.border.light};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    padding: 1.5rem;
    box-shadow: ${({ theme }) => theme.shadows.sm};
`;

export const FormHeader = styled.div`
    margin-bottom: 1rem;

    h2 {
        margin: 0 0 0.25rem 0;
        font-size: 1.5rem;
    }

    p {
        margin: 0;
        color: ${({ theme }) => theme.colors.text.secondary};
    }
`;

export const FormBody = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const Actions = styled.div`
    display: flex;
    gap: 0.75rem;
    align-items: center;
    margin-top: 0.25rem;
`;

export const ErrorText = styled.p`
    margin: 0.25rem 0 0 0;
    color: ${({ theme }) => theme.colors.error};
    font-size: 0.9rem;
`;