import { theme } from './theme';

export const mixins = {
    // Flexbox utilities
    flexCenter: `
    display: flex;
    align-items: center;
    justify-content: center;
  `,

    flexBetween: `
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,

    flexColumn: `
    display: flex;
    flex-direction: column;
  `,

    // Typography mixins
    heading: `
    font-family: ${theme.typography.fontFamily.secondary};
    font-weight: ${theme.typography.fontWeight.bold};
    line-height: ${theme.typography.lineHeight.tight};
  `,

    body: `
    font-family: ${theme.typography.fontFamily.primary};
    font-weight: ${theme.typography.fontWeight.normal};
    line-height: ${theme.typography.lineHeight.normal};
  `,

    // Button mixins
    buttonBase: `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    font-family: ${theme.typography.fontFamily.primary};
    font-weight: ${theme.typography.fontWeight.medium};
    text-decoration: none;
    transition: all 0.2s ease-in-out;
    border-radius: ${theme.borderRadius.md};
    
    &:focus {
      outline: 2px solid ${theme.colors.primary.main};
      outline-offset: 2px;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `,

    // Card mixins
    card: `
    background: ${theme.colors.neutral.white};
    border-radius: ${theme.borderRadius.lg};
    box-shadow: ${theme.shadows.base};
    transition: all 0.2s ease-in-out;
    
    &:hover {
      box-shadow: ${theme.shadows.lg};
    }
  `,

    // Responsive utilities
    mobile: `@media (max-width: ${theme.breakpoints.md})`,
    tablet: `@media (min-width: ${theme.breakpoints.md}) and (max-width: ${theme.breakpoints.lg})`,
    desktop: `@media (min-width: ${theme.breakpoints.lg})`,

    // Animation utilities
    slideIn: `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    animation: slideIn 0.3s ease-out;
  `,

    fadeIn: `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    animation: fadeIn 0.3s ease-out;
  `,

    // Glass morphism effect
    glassMorphism: `
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  `,
} as const;