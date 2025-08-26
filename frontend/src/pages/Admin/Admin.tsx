import React, { useState, useEffect } from 'react';
import {
    AdminContainer,
    AdminHeader,
    AdminContent,
    StatsSection,
    StatCard,
    ActionsSection,
    FiltersSection,
} from './Admin.styles';
import { ProductGrid } from '../../components/product';
import { Input, Button, Loading, Modal } from '../../components/common';
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
    const [showInactive, setShowInactive] = useState(false);

    const { state: authState } = useAuth();
    const {
        products,
        totalPages,
        isLoading,
        error,
        refetch,
    } = useProducts();

    const PAGE_SIZE = 12; // More products per page in admin mode

    const categories = [
        'CAMISETA', 'CALCA', 'BERMUDA', 'SHORTS', 'VESTIDO', 'SAIA',
        'BLUSA', 'JAQUETA', 'CASACO', 'TENIS', 'SAPATO', 'SANDALIA',
        'BONE', 'CHAPEU', 'BOLSA', 'MOCHILA', 'CARTEIRA', 'CINTO'
    ];

    const genders = ['MASCULINO', 'FEMININO', 'UNISSEX'];

    // Fetch products with filters
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCurrentPage(0);
            refetch({
                search: searchTerm,
                page: 0,
                size: PAGE_SIZE,
                category: selectedCategory || undefined,
                gender: selectedGender || undefined,
            });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, selectedCategory, selectedGender, showInactive, refetch]);


    useEffect(() => {
        refetch({
            search: searchTerm,
            page: currentPage,
            size: PAGE_SIZE,
            category: selectedCategory || undefined,
            gender: selectedGender || undefined,
        });
    }, [currentPage, refetch]);


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
        setShowInactive(false);
        setCurrentPage(0);
    };

    // Calculate stats
    const totalProducts = products.length;
    const activeProducts = products.filter(p => p.active).length;
    const lowStockProducts = products.filter(p => p.stock < 5).length;
    const outOfStockProducts = products.filter(p => p.stock === 0).length;

    if (!authState.isAuthenticated) {
        return (
            <AdminContainer>
                <div style={{ textAlign: 'center', padding: '4rem' }}>
                    <h2>Acesso Negado</h2>
                    <p>Você precisa fazer login para acessar o painel administrativo.</p>
                </div>
            </AdminContainer>
        );
    }

    return (
        <AdminContainer>
            <AdminHeader>
                <div>
                    <h1>Painel Administrativo</h1>
                    <p>Gerencie produtos e estoques da NOTRYA</p>
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
                    Limpar Filtros
                </Button>
            </FiltersSection>

            <AdminContent>
                {error ? (
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <p>Erro ao carregar produtos: {error}</p>
                        <Button
                            variant="primary"
                            onClick={() => refetch({
                                search: searchTerm,
                                page: currentPage,
                                size: PAGE_SIZE,
                                category: selectedCategory || undefined,
                                gender: selectedGender || undefined,
                            })}
                        >
                            Tentar Novamente
                        </Button>
                    </div>
                ) : isLoading ? (
                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
                        <Loading />
                    </div>
                ) : (
                    <>
                        <ProductGrid
                            products={products}
                            onEditProduct={onEditProduct}
                            onDeleteProduct={onDeleteProduct}
                            isAdminMode={true}
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
                                    Anterior
                                </Button>
                                <span style={{ fontWeight: 500 }}>
                  Página {currentPage + 1} de {totalPages}
                </span>
                                <Button
                                    variant="secondary"
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages - 1}
                                >
                                    Próxima
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </AdminContent>
        </AdminContainer>
    );
};