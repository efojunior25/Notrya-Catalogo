import styled, { keyframes } from 'styled-components';
import { theme } from '../../../styles/theme';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing[12]};
  text-align: center;
`;

const spinnerSizes = {
    small: '24px',
    medium: '40px',
    large: '56px',
};

export const Spinner = styled.div<{ size: keyof typeof spinnerSizes }>`
    width: ${({ size }) => spinnerSizes[size]};
    height: ${({ size }) => spinnerSizes[size]};
    border: 3px solid ${theme.colors.neutral.gray[200]};
    border-top: 3px solid ${theme.colors.primary.main};
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin-bottom: ${theme.spacing[4]};
`;


export const LoadingText = styled.p`
  font-family: ${theme.typography.fontFamily.primary};
  font-size: ${theme.typography.fontSize.lg};
  color: ${theme.colors.neutral.gray[600]};
  margin: 0;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;