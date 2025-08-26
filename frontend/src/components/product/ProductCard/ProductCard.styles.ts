import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { mixins } from '../../../styles/mixins';
import { Button } from '../../common';

export const CardContainer = styled.div`
  ${mixins.card}
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid ${theme.colors.neutral.gray[200]};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${theme.shadows.xl};
    border-color: ${theme.colors.primary.main};
  }

  ${mixins.mobile} {
    &:hover {
      transform: none;
    }
  }
`;

export const AdminControls = styled.div`
  position: absolute;
  top: ${theme.spacing[3]};
  right: ${theme.spacing[3]};
  display: flex;
  gap: ${theme.spacing[2]};
  z-index: 2;
`;

export const AdminButton = styled.button<{ type: 'edit' | 'delete' }>`
    ${mixins.flexCenter}
    width: 36px;
    height: 36px;
    border-radius: ${theme.borderRadius.full};
    border: none;
    cursor: pointer;
    font-size: ${theme.typography.fontSize.base};
    transition: all 0.2s ease;
    box-shadow: ${theme.shadows.md};

    background: ${({ type }: { type: 'edit' | 'delete' }) =>
            type === 'edit' ? theme.colors.warning : theme.colors.error};
    color: ${theme.colors.neutral.white};

    &:hover {
        transform: scale(1.1);
        box-shadow: ${theme.shadows.lg};
    }

    &:active {
        transform: scale(1);
    }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;
  background: ${theme.colors.neutral.gray[50]};
  border-radius: ${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;

  ${CardContainer}:hover & {
    transform: scale(1.05);
  }

  ${mixins.mobile} {
    ${CardContainer}:hover & {
      transform: none;
    }
  }
`;

export const NoImagePlaceholder = styled.div`
  ${mixins.flexCenter}
  width: 100%;
  height: 100%;
  background: linear-gradient(
    45deg,
    ${theme.colors.neutral.gray[100]} 25%,
    transparent 25%
  ),
  linear-gradient(
    -45deg,
    ${theme.colors.neutral.gray[100]} 25%,
    transparent 25%
  ),
  linear-gradient(
    45deg,
    transparent 75%,
    ${theme.colors.neutral.gray[100]} 75%
  ),
  linear-gradient(
    -45deg,
    transparent 75%,
    ${theme.colors.neutral.gray[100]} 75%
  );
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  color: ${theme.colors.neutral.gray[400]};
  font-size: ${theme.typography.fontSize['3xl']};
`;

export const CardContent = styled.div`
  padding: ${theme.spacing[5]};
`;

export const ProductName = styled.h3`
  ${mixins.heading}
  font-size: ${theme.typography.fontSize.xl};
  color: ${theme.colors.neutral.gray[900]};
  margin: 0 0 ${theme.spacing[2]} 0;
  line-height: ${theme.typography.lineHeight.tight};
`;

export const ProductBrand = styled.p`
  font-family: ${theme.typography.fontFamily.primary};
  font-weight: ${theme.typography.fontWeight.semibold};
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.primary.main};
  margin: 0 0 ${theme.spacing[2]} 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const ProductDescription = styled.p`
  ${mixins.body}
  font-size: ${theme.typography.fontSize.sm};
  color: ${theme.colors.neutral.gray[600]};
  line-height: ${theme.typography.lineHeight.relaxed};
  margin: 0 0 ${theme.spacing[3]} 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProductPrice = styled.div`
  font-family: ${theme.typography.fontFamily.secondary};
  font-size: ${theme.typography.fontSize['2xl']};
  font-weight: ${theme.typography.fontWeight.bold};
  color: ${theme.colors.primary.main};
  margin: 0 0 ${theme.spacing[4]} 0;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing[2]};
  margin-bottom: ${theme.spacing[3]};
`;

export const DetailTag = styled.span<{
    category?: boolean;
    color?: string;
    material?: boolean;
}>`
    padding: ${theme.spacing[1]} ${theme.spacing[2]};
    border-radius: ${theme.borderRadius.full};
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.medium};
    text-transform: uppercase;
    letter-spacing: 0.5px;

    ${({ category }: { category?: boolean }) => category && `
    background: ${theme.colors.gradients.primary};
    color: ${theme.colors.neutral.white};
  `}

    ${({ material }: { material?: boolean }) => material && `
    background: ${theme.colors.secondary.lighter};
    color: ${theme.colors.primary.dark};
    text-transform: none;
    letter-spacing: normal;
  `}

    ${({ color, category, material }: { color?: string; category?: boolean; material?: boolean }) => !category && !material && `
    background: ${theme.colors.neutral.gray[100]};
    color: ${theme.colors.neutral.gray[700]};
    border: 1px solid ${theme.colors.neutral.gray[300]};
  `}
`;

export const StockInfo = styled.p<{
    isLow: boolean;
    isEmpty: boolean;
}>`
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.medium};
    margin: 0 0 ${theme.spacing[4]} 0;

    color: ${({ isEmpty, isLow }: { isEmpty: boolean; isLow: boolean }) => {
        if (isEmpty) return theme.colors.error;
        if (isLow) return theme.colors.warning;
        return theme.colors.success;
    }};
`;


export const ActionButton = styled(Button)<{ fullWidth?: boolean }>`
    width: ${({ fullWidth }: { fullWidth?: boolean }) => fullWidth ? '100%' : 'auto'};
    font-weight: ${theme.typography.fontWeight.semibold};
`;
