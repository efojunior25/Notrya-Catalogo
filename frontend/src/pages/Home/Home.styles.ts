import styled from 'styled-components';

export const HomeContainer = styled.main`
    flex: 1 0 auto; /* ✅ CRUCIAL: Empurra footer para baixo */
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    min-height: calc(100vh - 200px); /* Header + Footer aproximados */

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
    min-height: 500px; /* ✅ Garante altura mínima */
    margin-bottom: 2rem;
`;

export const PaginationWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    margin-top: 2rem;
    padding: 1rem;
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