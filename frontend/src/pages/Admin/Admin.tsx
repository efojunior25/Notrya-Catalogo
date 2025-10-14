import React, { useState, useEffect } from 'react';
import {
    AdminContainer,
    AdminHeader,
    AdminContent,
    StatsSection,
    StatCard,
    FiltersSection,
} from './Admin.styles';
import { ProductGrid } from '../../components/product';
import { Input, Button, Loading } from '../../components/common';
import { useProducts } from '../../hooks/useProducts';
import { useAuth } from '../../contexts/AuthContext';
import { Product } from '../../types';

interface AdminProps {
    onEditProduct: (product: Product) => void;
    onDeleteProduct: (id: number) => void;
    onOpenProductForm: () => void;
}

export const Admin: React.FC<AdminProps> = ({
                                                onEditProduct,
                                                onDeleteProduct,
                                                onOpenProductForm,
                                            }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const { state: authState } = useAuth();
    const {
        products,
        totalPages,
        isLoading,
        error,
        refetch,
    } = useProducts(12);

    const PAGE_SIZE = 12;

    const categories = [
        'CAMISETA', 'CALCA', 'BERMUDA', 'SHORTS', 'VESTIDO', 'SAIA',
        'BLUSA', 'JAQUETA', 'CASACO', 'TENIS', 'SAPATO', 'SANDALIA',
        'BONE', 'CHAPEU', 'BOLSA', 'MOCHILA', 'CARTEIRA', 'CINTO'
    ];

    const genders = ['MASCULINO', 'FEMININO', 'UNISSEX'];

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCurrentPage(0);
            refetch();
        }, 300);
        return () => clearTimeout(timeoutId);
    }, [searchTerm, selectedCategory, selectedGender]);

    useEffect(() => {
        refetch();
    }, [currentPage, searchTerm]);

    const handlePreviousPage = () => {
        setCurrentPage(prev => Math.max(0, prev - 1));
    };

    const handleNextPage = () => {
        setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
    };

    const resetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setSelectedGender('');
        setCurrentPage(0);
    };

    const handleRetry = () => {
        // @ts-ignore
        refetch({
            search: searchTerm,
            page: currentPage,
            size: PAGE_SIZE,
        });
    };

    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.active).length;
    const lowStockProducts = products.filter(p => p.stock < 5).length;
    const outOfStockProducts = products.filter(p => p.stock === 0).length;

    if (!authState.isAuthenticated) {
        return (
            <AdminContainer>
                <div style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1rem'
                }}>
                    <h2 style={{ color: '#DC3545', margin: 0 }}>
                        🔒 Acesso Negado
                    </h2>
                    <p style={{ margin: 0, color: '#5F6368' }}>
                        Você precisa fazer login para acessar o painel administrativo.
                    </p>
                </div>
            </AdminContainer>
        );
    }

    return (
        <AdminContainer>
            <AdminHeader>
                <div>
                    <h1>🏪 Painel Administrativo</h1>
                    <p>Gerencie produtos e estoque da NOTRYA</p>
                </div>
                <Button variant="primary" onClick={onOpenProductForm}>
                    ➕ Novo Produto
                </Button>
            </AdminHeader>

            <StatsSection>
                <StatCard>
                    <h3>{totalProducts}</h3>
                    <p>Total de Produtos</p>
                </StatCard>
                <StatCard>
                    <h3>{activeProducts}</h3>
                    <p>Produtos Ativos</p>
                </StatCard>
                <StatCard $warning={lowStockProducts > 0}>
                    <h3>{lowStockProducts}</h3>
                    <p>Estoque Baixo</p>
                </StatCard>
                <StatCard $error={outOfStockProducts > 0}>
                    <h3>{outOfStockProducts}</h3>
                    <p>Sem Estoque</p>
                </StatCard>
            </StatsSection>

            <FiltersSection>
                <Input
                    type="text"
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">Todas as categorias</option>
                    {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
                <select
                    value={selectedGender}
                    onChange={(e) => setSelectedGender(e.target.value)}
                >
                    <option value="">Todos os gêneros</option>
                    {genders.map(gender => (
                        <option key={gender} value={gender}>{gender}</option>
                    ))}
                </select>
                <Button variant="secondary" onClick={resetFilters}>
                    🔄 Limpar Filtros
                </Button>
            </FiltersSection>

            <AdminContent>
                {error ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '4rem 2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        <h3 style={{ color: '#DC3545', margin: 0 }}>
                            Erro ao carregar produtos
                        </h3>
                        <p style={{ margin: 0, color: '#5F6368' }}>
                            {error}
                        </p>
                        <Button variant="primary" onClick={handleRetry}>
                            🔄 Tentar Novamente
                        </Button>
                    </div>
                ) : isLoading ? (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '400px'
                    }}>
                        <Loading text="Carregando produtos..." size="large" />
                    </div>
                ) : (
                    <>
                        <ProductGrid
                            products={products}
                            isAdminMode={true}
                            onEditProduct={onEditProduct}
                            onDeleteProduct={onDeleteProduct}
                        />

                        {totalPages > 1 && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '1.5rem',
                                marginTop: '2rem',
                                flexWrap: 'wrap'
                            }}>
                                <Button
                                    variant="secondary"
                                    onClick={handlePreviousPage}
                                    disabled={currentPage === 0}
                                >
                                    ← Anterior
                                </Button>
                                <span style={{ fontWeight: 500, color: '#5F6368' }}>
                                    Página {currentPage + 1} de {totalPages}
                                </span>
                                <Button
                                    variant="secondary"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages - 1}
                                >
                                    Próxima →
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </AdminContent>
        </AdminContainer>
    );
};