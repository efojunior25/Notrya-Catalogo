import React from 'react';
import { Button } from '../../common';
import { User } from '../../../types';
import {
    HeaderContainer,
    HeaderContent,
    Logo,
    Navigation,
    UserSection,
    CartButton,
    UserControls,
    WelcomeText,
    AdminToggle,
    LogoutButton,
    LoginButton,
    CartIcon,
    CartBadge,
    MobileMenuButton,
    MobileMenu,
    MobileMenuItem,
} from './Header.styles';

interface HeaderProps {
    user: User | null;
    isAuthenticated: boolean;
    isAdminMode: boolean;
    cartItemCount: number;
    onLoginClick: () => void;
    onLogout: () => void;
    onCartClick: () => void;
    onAdminToggle: () => void;
    onAddProductClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
                                                  user,
                                                  isAuthenticated,
                                                  isAdminMode,
                                                  cartItemCount,
                                                  onLoginClick,
                                                  onLogout,
                                                  onCartClick,
                                                  onAdminToggle,
                                                  onAddProductClick,
                                              }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <HeaderContainer>
            <HeaderContent>
                <Logo>
                    <span className="brand-name">NOTRYA</span>
                    <span className="tagline">Moda Moderna</span>
                </Logo>

                {/* ✅ BOTÃO APARECE APENAS UMA VEZ NO HEADER */}
                <Navigation>
                    {isAdminMode && isAuthenticated && onAddProductClick && (
                        <Button
                            variant="secondary"
                            size="small"
                            onClick={onAddProductClick}
                        >
                            ➕ Novo Produto
                        </Button>
                    )}
                </Navigation>

                <UserSection>
                    {!isAuthenticated ? (
                        <LoginButton onClick={onLoginClick}>
                            <span className="icon">👤</span>
                            <span className="text">Login</span>
                        </LoginButton>
                    ) : (
                        <UserControls>
                            <WelcomeText>
                                Olá, <strong>{user?.fullName}</strong>
                            </WelcomeText>
                            <AdminToggle
                                active={isAdminMode}
                                onClick={onAdminToggle}
                            >
                                <span className="icon">⚙️</span>
                                <span className="text">
                                    {isAdminMode ? 'Modo Cliente' : 'Admin'}
                                </span>
                            </AdminToggle>
                            <LogoutButton onClick={onLogout}>
                                <span className="icon">🚪</span>
                                <span className="text">Sair</span>
                            </LogoutButton>
                        </UserControls>
                    )}

                    {!isAdminMode && (
                        <CartButton onClick={onCartClick}>
                            <CartIcon>🛒</CartIcon>
                            <span className="cart-text">Carrinho</span>
                            {cartItemCount > 0 && (
                                <CartBadge>{cartItemCount}</CartBadge>
                            )}
                        </CartButton>
                    )}

                    <MobileMenuButton onClick={toggleMobileMenu}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </MobileMenuButton>
                </UserSection>

                {/* Mobile Menu */}
                <MobileMenu isOpen={isMobileMenuOpen}>
                    {isAuthenticated && (
                        <>
                            <MobileMenuItem>
                                <WelcomeText>Olá, {user?.fullName}</WelcomeText>
                            </MobileMenuItem>
                            <MobileMenuItem>
                                <AdminToggle
                                    active={isAdminMode}
                                    onClick={onAdminToggle}
                                >
                                    {isAdminMode ? '👤 Modo Cliente' : '⚙️ Admin'}
                                </AdminToggle>
                            </MobileMenuItem>
                            {isAdminMode && onAddProductClick && (
                                <MobileMenuItem>
                                    <Button
                                        variant="secondary"
                                        size="small"
                                        onClick={onAddProductClick}
                                        fullWidth
                                    >
                                        ➕ Novo Produto
                                    </Button>
                                </MobileMenuItem>
                            )}
                            <MobileMenuItem>
                                <LogoutButton onClick={onLogout}>
                                    🚪 Sair
                                </LogoutButton>
                            </MobileMenuItem>
                        </>
                    )}
                    {!isAuthenticated && (
                        <MobileMenuItem>
                            <LoginButton onClick={onLoginClick}>
                                👤 Login
                            </LoginButton>
                        </MobileMenuItem>
                    )}
                    {!isAdminMode && (
                        <MobileMenuItem>
                            <CartButton onClick={onCartClick}>
                                🛒 Carrinho ({cartItemCount})
                            </CartButton>
                        </MobileMenuItem>
                    )}
                </MobileMenu>
            </HeaderContent>
        </HeaderContainer>
    );
};