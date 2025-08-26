import styled from 'styled-components';

export const AdminContainer = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: calc(100vh - 80px);

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const AdminHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;

  h1 {
    color: ${({ theme }) => theme.colors.primary.main};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    margin: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    text-align: center;
  }
`;

export const StatsSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const StatCard = styled.div<{ $warning?: boolean; $error?: boolean }>`
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;

  ${({ $warning, theme }) => $warning && `
    border-color: ${theme.colors.warning};
    background: ${theme.colors.warning}10;
  `}

  ${({ $error, theme }) => $error && `
    border-color: ${theme.colors.error};
    background: ${theme.colors.error}10;
  `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }

  h3 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${({ theme, $warning, $error }) =>
    $error ? theme.colors.error :
        $warning ? theme.colors.warning :
            theme.colors.primary.main
};
  }

  p {
    margin: 0;
    color: ${({ theme }) => theme.colors.text.secondary};
    font-weight: 500;
  }
`;

export const FiltersSection = styled.section`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;

  > * {
    min-width: 200px;
  }

  select {
    padding: 0.75rem 1rem;
    border: 2px solid ${({ theme }) => theme.colors.border.default};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    background: ${({ theme }) => theme.colors.background.primary};
    color: ${({ theme }) => theme.colors.text.primary};
    font-size: 1rem;
    cursor: pointer;

    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    
    > * {
      min-width: auto;
    }
  }
`;

export const AdminContent = styled.div`
  min-height: 400px;
`;

export const ActionsSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  gap: 1rem;
`;