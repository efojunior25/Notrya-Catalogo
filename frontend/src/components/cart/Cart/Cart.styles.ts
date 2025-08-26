import styled from 'styled-components';
import { Button } from '../../common';

export const CartOverlay = styled.div`
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.4);
    backdrop-filter: blur(1px);
    display: flex;
    justify-content: flex-end;
    z-index: 1000;
`;

export const CartSidebar = styled.div`
    width: 100%;
    max-width: 420px;
    height: 100%;
    background: ${({ theme }) => theme.colors.background.primary};
    box-shadow: -4px 0 16px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    animation: slideInRight 0.3s ease-out both;
`;

export const CartHeader = styled.div`
    padding: 1rem 1.25rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CartTitle = styled.h3`
    margin: 0;
    font-size: 1.25rem;
`;

export const CloseButton = styled.button`
    background: transparent;
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1.25rem;
    padding: 0.25rem 0.5rem;

    &:hover {
        opacity: 0.8;
    }
`;

export const CartContent = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const EmptyCart = styled.div`
    padding: 2rem 1rem;
    text-align: center;
    color: ${({ theme }) => theme.colors.text.secondary};
`;

export const EmptyCartIcon = styled.div`
    font-size: 2rem;
    margin-bottom: 0.5rem;
`;

export const EmptyCartText = styled.p`
    margin: 0.25rem 0 0.5rem 0;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text.primary};
`;

export const CartTotal = styled.div`
    margin-top: auto;
    padding: 1rem 0;
    border-top: 1px solid ${({ theme }) => theme.colors.border.light};
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

export const TotalAmount = styled.div`
    font-weight: 700;
    font-size: 1.125rem;
    color: ${({ theme }) => theme.colors.text.primary};
    display: flex;
    justify-content: space-between;
`;

export const CheckoutButton = styled(Button)`
    width: 100%;
`;