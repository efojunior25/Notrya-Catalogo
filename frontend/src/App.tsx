import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Admin } from './pages/Admin/Admin';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Cart } from './components/cart/Cart';
import { Modal } from './components/common/Modal';
import { LoginForm, LoginFormValues } from './components/auth/LoginForm';
import { ProductForm } from './components/product/ProductForm';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider, useCart } from './contexts/CartContext';
import { Product, ProductFormData } from './types';
import { useProducts } from './hooks/useProducts';

import './App.css';

const AppContent: React.FC = () => {
    const { state: authState, login, logout, clearError } = useAuth();
    const {
        state: cartState,
        addToCart,
        removeFromCart,
        removeItemCompletely,
        updateQuantity,
        toggleCart,
        closeCart,
        checkout,
        getItemCount,
        clearError: clearCartError
    } = useCart();

    const {
        createProduct,
        updateProduct,
        deleteProduct,
        uploadImage,
        deleteImage
    } = useProducts();

    const [isAdminMode, setIsAdminMode] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleLogin = () => {
        setIsLoginModalOpen(true);
    };

    const handleLoginSubmit = async (values: LoginFormValues) => {
        try {
            const success = await login(values);
            if (success) {
                setIsLoginModalOpen(false);
            }
        } catch (error) {
            console.error('Erro no login:', error);
        }
    };

    const handleLogout = () => {
        logout();
        setIsAdminMode(false); // Reset admin mode on logout
    };

    const handleCartClick = () => {
        if (!isAdminMode) {
            toggleCart();
        }
    };

    const handleAdminToggle = () => {
        if (authState.isAuthenticated) {
            setIsAdminMode(!isAdminMode);
        }
    };

    const handleAddProduct = () => {
        setEditingProduct(null);
        setIsProductFormOpen(true);
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setIsProductFormOpen(true);
    };

    const handleDeleteProduct = async (id: number) => {
        try {
            const result = await deleteProduct(id);
            if (!result.success) {
                alert(result.error || 'Erro ao excluir produto');
            }
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto');
        }
    };

    const handleProductFormSubmit = async (data: ProductFormData) => {
        try {
            let result;
            if (editingProduct) {
                result = await updateProduct(editingProduct.id, data);
            } else {
                result = await createProduct(data);
            }

            if (result.success) {
                setIsProductFormOpen(false);
                setEditingProduct(null);
            }

            return result;
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            return {
                success: false,
                error: 'Erro interno ao salvar produto'
            };
        }
    };

    const handleProductFormClose = () => {
        setIsProductFormOpen(false);
        setEditingProduct(null);
    };

    const handleAddToCart = (product: Product) => {
        if (product.stock > 0) {
            addToCart(product);
        }
    };

    const handleCartCheckout = async () => {
        try {
            await checkout();
        } catch (error) {
            console.error('Erro no checkout:', error);
        }
    };

    const handleUpdateCartQuantity = (productId: number, quantity: number) => {
        if (quantity <= 0) {
            removeItemCompletely(productId);
        } else {
            const currentItem = cartState.items.find(item => item.productId === productId);
            if (!currentItem) return;

            const quantityDiff = quantity - currentItem.quantity;

            if (quantityDiff > 0) {

                for (let i = 0; i < quantityDiff; i++) {
                    addToCart({
                        id: currentItem.productId,
                        name: currentItem.productName,
                        price: currentItem.price,
                        stock: currentItem.stock,
                        active: true,
                    } as Product);
                }
            } else if (quantityDiff < 0) {
                removeFromCart(productId, Math.abs(quantityDiff));
            }
        }
    };

    const handleRemoveCartItem = (productId: number) => {
        removeItemCompletely(productId);
    };

    const handleCloseLoginModal = () => {
        setIsLoginModalOpen(false);
        clearError();
    };

    const handleCloseCart = () => {
        closeCart();
        clearCartError();
    };

    return (
        <>
            <Header
                user={authState.user}
                isAuthenticated={authState.isAuthenticated}
                isAdminMode={isAdminMode}
                cartItemCount={getItemCount()}
                onLoginClick={handleLogin}
                onLogout={handleLogout}
                onCartClick={handleCartClick}
                onAdminToggle={handleAdminToggle}
                onAddProductClick={isAdminMode ? handleAddProduct : undefined}
            />

            <div className="app">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                onAddToCart={handleAddToCart}
                                isAdminMode={isAdminMode}
                                onEditProduct={isAdminMode ? handleEditProduct : undefined}
                                onDeleteProduct={isAdminMode ? handleDeleteProduct : undefined}
                                onOpenProductForm={isAdminMode ? handleAddProduct : undefined}
                            />
                        }
                    />
                    <Route
                        path="/admin"
                        element={
                            <Admin
                                onEditProduct={handleEditProduct}
                                onDeleteProduct={handleDeleteProduct}
                                onOpenProductForm={handleAddProduct}
                            />
                        }
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>

            <Footer />

            <Modal
                isOpen={isLoginModalOpen}
                onClose={handleCloseLoginModal}
                title="Entrar na sua conta"
                size="small"
            >
                <LoginForm
                    onSubmit={handleLoginSubmit}
                    isLoading={authState.isLoading}
                    error={authState.error}
                />
            </Modal>

            <ProductForm
                isOpen={isProductFormOpen}
                onClose={handleProductFormClose}
                onSubmit={handleProductFormSubmit}
                onUploadImage={uploadImage}
                onDeleteImage={deleteImage}
                editingProduct={editingProduct}
                title="Produto"
            />

            <Cart
                isOpen={cartState.isOpen}
                items={cartState.items}
                onClose={handleCloseCart}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveCartItem}
                onCheckout={handleCartCheckout}
                isLoading={cartState.isLoading}
            />
        </>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <AppContent />
            </CartProvider>
        </AuthProvider>
    );
};

export default App;