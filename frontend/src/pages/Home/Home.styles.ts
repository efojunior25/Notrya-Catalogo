import styled from 'styled-components';

export const HomeContainer = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: calc(100vh - 80px); // Subtract header height

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export const SearchSection = styled.section`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    
    > button {
      margin-left: 0 !important;
    }
  }
`;

export const ProductsSection = styled.section`
  min-height: 400px;
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;

  span {
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.secondary};
    min-width: 150px;
    text-align: center;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    
    span {
      order: -1;
    }
  }
`;