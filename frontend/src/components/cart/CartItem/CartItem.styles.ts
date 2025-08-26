// frontend/src/components/cart/CartItem/CartItem.styles.ts
import styled from 'styled-components';

export const ItemContainer = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1.25rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

export const ItemImageContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;

export const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: 480px) {
    width: 100%;
    height: 120px;
    border-radius: 12px;
  }
`;

export const NoImagePlaceholder = styled.div`
  width: 80px;
  height: 80px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.text.tertiary};

  @media (max-width: 480px) {
    width: 100%;
    height: 120px;
    font-size: 2rem;
  }
`;

export const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  gap: 0.5rem;
`;

export const ItemName = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.3;
  word-break: break-word;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text.tertiary};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1;
  flex-shrink: 0;
  transition: all 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.error};
    background: ${({ theme }) => theme.colors.error}10;
  }

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.error};
    outline-offset: 2px;
  }
`;

export const ItemPrice = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.main};
  margin-bottom: 0.75rem;
`;

export const ItemDetails = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 1rem;
  line-height: 1.4;
`;

export const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  border: 1px solid ${({ theme }) => theme.colors.border.default};
  border-radius: 6px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.primary};
`;

export const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: none;
  background: ${({ theme }) => theme.colors.background.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.125rem;
  font-weight: 600;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.primary.main};
    color: white;
  }
`;

export const QuantityDisplay = styled.div`
  min-width: 40px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.background.primary};
  border-left: 1px solid ${({ theme }) => theme.colors.border.default};
  border-right: 1px solid ${({ theme }) => theme.colors.border.default};
`;

export const StockInfo = styled.span<{ isLow: boolean }>`
  font-size: 0.75rem;
  color: ${({ theme, isLow }) =>
    isLow ? theme.colors.warning : theme.colors.text.tertiary};
  font-weight: 500;
`;

export const ItemTotal = styled.div`
  text-align: right;
  margin-top: 0.5rem;
`;

export const TotalLabel = styled.div`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 0.25rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 500;
`;

export const TotalValue = styled.div`
  font-size: 1.125rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary.main};
`;