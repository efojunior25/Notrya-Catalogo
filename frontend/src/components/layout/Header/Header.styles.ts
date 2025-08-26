import styled from 'styled-components';
import { theme } from '../../../styles/theme';
import { mixins } from '../../../styles/mixins';

export const HeaderContainer = styled.header`
  background: ${theme.colors.gradients.hero};
  box-shadow: ${theme.shadows.lg};
  position: sticky;
  top: 0;
  z-index: ${theme.zIndex.sticky};
  backdrop-filter: blur(10px);
`;

export const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${theme.spacing[4]} ${theme.spacing[6]};
  ${mixins.flexBetween}
  position: relative;

  ${mixins.mobile} {
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
    flex-wrap: wrap;
  }
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  .brand-name {
    font-family: ${theme.typography.fontFamily.secondary};
    font-size: ${theme.typography.fontSize['3xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.neutral.white};
    line-height: 1;
    letter-spacing: -0.5px;
  }

  .tagline {
    font-family: ${theme.typography.fontFamily.primary};
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.secondary.light};
    font-weight: ${theme.typography.fontWeight.medium};
    margin-top: ${theme.spacing[1]};
  }

  ${mixins.mobile} {
    .brand-name {
      font-size: ${theme.typography.fontSize['2xl']};
    }
    .tagline {
      font-size: ${theme.typography.fontSize.xs};
    }
  }
`;

export const Navigation = styled.nav`
  ${mixins.flexCenter}
  gap: ${theme.spacing[4]};

  ${mixins.mobile} {
    display: none;
  }
`;

export const UserSection = styled.div`
  ${mixins.flexCenter}
  gap: ${theme.spacing[4]};
  position: relative;

  ${mixins.mobile} {
    gap: ${theme.spacing[2]};
  }
`;

export const UserControls = styled.div`
  ${mixins.flexCenter}
  gap: ${theme.spacing[3]};

  ${mixins.mobile} {
    display: none;
  }
`;

export const WelcomeText = styled.span`
  color: ${theme.colors.neutral.white};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};

  strong {
    font-weight: ${theme.typography.fontWeight.semibold};
  }

  ${mixins.mobile} {
    font-size: ${theme.typography.fontSize.xs};
  }
`;

const baseButton = `
  ${mixins.buttonBase}
  ${mixins.glassMorphism}
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: ${theme.colors.neutral.white};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSize.sm};
  gap: ${theme.spacing[2]};
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  .icon {
    font-size: ${theme.typography.fontSize.base};
  }

  .text {
    font-weight: ${theme.typography.fontWeight.medium};
  }
`;

export const LoginButton = styled.button`
  ${baseButton}
`;

export const LogoutButton = styled.button`
  ${baseButton}
`;

export const AdminToggle = styled.button<{ active: boolean }>`
    ${baseButton}
    background: ${({ active }: { active: boolean }) =>
            active ? 'rgba(206, 182, 129, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
    border-color: ${({ active }: { active: boolean }) =>
            active ? 'rgba(206, 182, 129, 0.5)' : 'rgba(255, 255, 255, 0.2)'};

    &:hover {
        background: ${({ active }: { active: boolean }) =>
                active ? 'rgba(206, 182, 129, 0.4)' : 'rgba(255, 255, 255, 0.2)'};
    }
`;

export const CartButton = styled.button`
  ${baseButton}
  position: relative;
  min-width: 120px;

  .cart-text {
    ${mixins.mobile} {
      display: none;
    }
  }
`;

export const CartIcon = styled.span`
  font-size: ${theme.typography.fontSize.lg};
`;

export const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background: ${theme.colors.secondary.main};
  color: ${theme.colors.primary.dark};
  border-radius: ${theme.borderRadius.full};
  width: 24px;
  height: 24px;
  ${mixins.flexCenter}
  font-size: ${theme.typography.fontSize.xs};
  font-weight: ${theme.typography.fontWeight.bold};
  border: 2px solid ${theme.colors.neutral.white};
`;

export const MobileMenuButton = styled.button`
  display: none;
  ${mixins.flexColumn}
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${theme.borderRadius.md};
  cursor: pointer;
  gap: 4px;

  span {
    width: 20px;
    height: 2px;
    background: ${theme.colors.neutral.white};
    border-radius: 1px;
    transition: all 0.3s ease;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  ${mixins.mobile} {
    display: flex;
  }
`;

export const MobileMenu = styled.div<{ isOpen: boolean }>`
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${theme.colors.gradients.primary};
    border-radius: 0 0 ${theme.borderRadius.xl} ${theme.borderRadius.xl};
    box-shadow: ${theme.shadows.xl};
    padding: ${theme.spacing[4]};
    transform: ${({ isOpen }: { isOpen: boolean }) => isOpen ? 'translateY(0)' : 'translateY(-100%)'};
    opacity: ${({ isOpen }: { isOpen: boolean }) => isOpen ? 1 : 0};
    visibility: ${({ isOpen }: { isOpen: boolean }) => isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease;

    ${mixins.mobile} {
        display: block;
    }
`;


export const MobileMenuItem = styled.div`
  margin-bottom: ${theme.spacing[3]};
  
  &:last-child {
    margin-bottom: 0;
  }

  button {
    width: 100%;
    justify-content: center;
    padding: ${theme.spacing[3]} ${theme.spacing[4]};
  }
`;