import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Admin } from './pages/Admin/Admin';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';

import './App.css';

const App: React.FC = () => {
    // Se precisar passar handlers para Home/Admin (ex.: onAddToCart), conecte-os via props ou contextos
    return (
        <>
            <Header user={null} isAuthenticated={false} isAdminMode={false} cartItemCount={0} onLoginClick={function(): void {
                throw new Error("Function not implemented.");
            } } onLogout={function(): void {
                throw new Error("Function not implemented.");
            } } onCartClick={function(): void {
                throw new Error("Function not implemented.");
            } } onAdminToggle={function(): void {
                throw new Error("Function not implemented.");
            } } />
                <div className="app">
                    <Routes>
                        <Route path="/" element={<Home onAddToCart={() => { /* implemente conforme seu fluxo */ }} />} />
                        <Route path="/admin" element={<Admin onEditProduct={() => { /* implemente */ }} onDeleteProduct={() => { /* implemente */ }} onOpenProductForm={() => { /* implemente */ }} />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            <Footer />
        </>
    );
};

export default App;
