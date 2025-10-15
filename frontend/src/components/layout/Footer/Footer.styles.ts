import styled from 'styled-components';

export const FooterContainer = styled.footer`
    margin-top: auto;
    border-top: 1px solid ${({ theme }) => theme.colors.border.light};
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.text.secondary};
    flex-shrink: 0;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const FooterText = styled.p`
  margin: 0;
`;

export const FooterLinks = styled.nav`
  display: flex;
  gap: 1rem;
  a {
    color: ${({ theme }) => theme.colors.text.secondary};
    &:hover {
      color: ${({ theme }) => theme.colors.text.primary};
    }
  }
`;