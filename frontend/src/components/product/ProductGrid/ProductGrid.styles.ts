import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { mixins } from '../../../styles/mixins';

export const GridContainer = styled.div`
  width: 100%;
`;

export const SearchContainer = styled.div`
  ${mixins.flexCenter}
  margin-bottom: ${theme.spacing[8]};
  padding: 0 ${theme.spacing[4]};
`;

export const SearchInput = styled.input`
  width: 100%;
  max-width: 600px;
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  font-size: ${theme.typography.fontSize.lg};
  border: 2px solid ${theme.colors.neutral.gray[300]};
  border-radius: ${theme.borderRadius.full};
  background: ${theme.colors.neutral.white};
  box-shadow: ${theme.shadows.md};
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: ${theme.colors.primary.main};
    box-shadow: ${theme.shadows.lg}, 0 0 0 3px rgba(193, 24, 26, 0.1);
  }

  &::placeholder {
    color: ${theme.colors.neutral.gray[400]};
  }

  ${mixins.mobile} {
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
    font-size: ${theme.typography.fontSize.base};
  }
`;

export const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${theme.spacing[6]};
  margin-bottom: ${theme.spacing[8]};

  ${mixins.mobile} {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: ${theme.spacing[4]};
  }
`;

export const EmptyState = styled.div`
  ${mixins.flexCenter}
  ${mixins.flexColumn}
  padding: ${theme.spacing[16]} ${theme.spacing[4]};
  text-align: center;
`;

export const EmptyStateIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${theme.spacing[4]};
  opacity: 0.5;
`;

export const EmptyStateTitle = styled.h3`
  ${mixins.heading}
  font-size: ${theme.typography.fontSize['2xl']};
  color: ${theme.colors.neutral.gray[700]};
  margin: 0 0 ${theme.spacing[2]} 0;
`;

export const EmptyStateDescription = styled.p`
  ${mixins.body}
  font-size: ${theme.typography.fontSize.base};
  color: ${theme.colors.neutral.gray[500]};
  max-width: 400px;
  line-height: ${theme.typography.lineHeight.relaxed};
  margin: 0;
`;

export const PaginationContainer = styled.div`
  ${mixins.flexCenter}
  gap: ${theme.spacing[6]};
  padding: ${theme.spacing[4]};

  ${mixins.mobile} {
    flex-direction: column;
    gap: ${theme.spacing[4]};
  }
`;

export const PaginationButton = styled.button`
  ${mixins.buttonBase}
  padding: ${theme.spacing[3]} ${theme.spacing[5]};
  background: ${theme.colors.neutral.white};
  color: ${theme.colors.primary.main};
  border: 2px solid ${theme.colors.primary.main};
  border-radius: ${theme.borderRadius.md};
  font-weight: ${theme.typography.fontWeight.semibold};

  &:hover:not(:disabled) {
    background: ${theme.colors.primary.main};
    color: ${theme.colors.neutral.white};
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const PaginationInfo = styled.span`
  font-weight: ${theme.typography.fontWeight.medium};
  color: ${theme.colors.neutral.gray[600]};
  font-size: ${theme.typography.fontSize.base};
`;