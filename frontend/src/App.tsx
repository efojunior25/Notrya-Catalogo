import React, {useCallback, useEffect, useState} from 'react';
import './App.css';

interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    size: string;
    color: string;
    brand?: string;
    material?: string;
    gender: string;
    imageUrl?: string;
    active: boolean;
}

interface ProductPage {
    content: Product[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

interface CartItem {
    productId: number;
    productName: string;
    price: number;
    quantity: number;
    stock: number;
}

interface OrderItem {
    productId: number;
    quantity: number;
}

interface OrderRequest {
    items: OrderItem[];
}

interface StockError {
    productId: number;
    available: number;
    productName?: string;
}

interface OrderResponse {
    id: number;
    createAt: string;
    total: number;
    items: Array<{
        productId: number;
        productName: string;
        quantity: number;
        unitPrice: number;
        lineTotal: number;
    }>;
}

interface User {
    username: string;
    fullName: string;
    email: string;
}

interface LoginRequest {
    username: string;
    password: string;
}

interface LoginResponse {
    token: string;
    type: string;
    username: string;
    fullName: string;
    email: string;
}

interface ProductFormData {
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    size: string;
    color: string;
    brand: string;
    material: string;
    gender: string;
    imageUrl: string;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

function App() {
    // Estados existentes
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', content: string } | null>(null);
    const [stockErrors, setStockErrors] = useState<StockError[]>([]);

    // Estados para autenticação e administração
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isAdminMode, setIsAdminMode] = useState(false);
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [loginForm, setLoginForm] = useState<LoginRequest>({ username: '', password: '' });
    const [productForm, setProductForm] = useState<ProductFormData>({
        name: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        size: '',
        color: '',
        brand: '',
        material: '',
        gender: '',
        imageUrl: ''
    });

    // Novos estados para upload de imagem
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [currentImageFile, setCurrentImageFile] = useState<string | null>(null);

    const PAGE_SIZE = 6;

    // Verificar se usuário está logado ao carregar a página
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            validateToken(token);
        }
    }, []);

    const validateToken = async (token: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/validate`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const userData = JSON.parse(localStorage.getItem('user') || '{}');
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error('Erro na validação do token:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    };

    const login = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginForm)
            });

            if (!response.ok) {
                throw new Error('Credenciais inválidas');
            }

            const loginResponse: LoginResponse = await response.json();

            localStorage.setItem('token', loginResponse.token);
            localStorage.setItem('user', JSON.stringify({
                username: loginResponse.username,
                fullName: loginResponse.fullName,
                email: loginResponse.email
            }));

            setUser({
                username: loginResponse.username,
                fullName: loginResponse.fullName,
                email: loginResponse.email
            });
            setIsAuthenticated(true);
            setIsLoginOpen(false);
            setLoginForm({ username: '', password: '' });
            setMessage({ type: 'success', content: 'Login realizado com sucesso!' });
        } catch (error) {
            console.error('Erro no login:', error);
            setMessage({ type: 'error', content: 'Erro no login. Verifique suas credenciais.' });
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsAuthenticated(false);
        setIsAdminMode(false);
        setMessage({ type: 'success', content: 'Logout realizado com sucesso!' });
    };

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        };
    };

    // Função para fazer upload da imagem
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validações do lado cliente
        if (file.size > 5 * 1024 * 1024) {
            setMessage({ type: 'error', content: 'Arquivo muito grande. Máximo 5MB' });
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            setMessage({ type: 'error', content: 'Tipo de arquivo não permitido. Use JPG, PNG, GIF ou WebP' });
            return;
        }

        setUploadingImage(true);

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_BASE_URL}/upload/image`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Erro no upload');
            }

            const result = await response.json();

            if (result.success) {
                // Construir URL completa para preview e armazenamento
                const fullUrl = `${API_BASE_URL.replace('/api/v1', '')}${result.url}`;

                setImagePreview(fullUrl);
                setCurrentImageFile(result.filename);
                setProductForm({...productForm, imageUrl: result.url});

                setMessage({ type: 'success', content: 'Imagem carregada com sucesso!' });
            } else {
                throw new Error(result.error || 'Erro no upload');
            }

        } catch (error) {
            console.error('Erro no upload:', error);
            setMessage({
                type: 'error',
                content: error instanceof Error ? error.message : 'Erro no upload da imagem'
            });
        } finally {
            setUploadingImage(false);
        }
    };

    // Função para remover imagem
    const handleRemoveImage = async () => {
        if (!currentImageFile) return;

        try {
            const response = await fetch(`${API_BASE_URL}/upload/image/${currentImageFile}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setImagePreview(null);
                setCurrentImageFile(null);
                setProductForm({...productForm, imageUrl: ''});
                setMessage({ type: 'success', content: 'Imagem removida com sucesso!' });
            }
        } catch (error) {
            console.error('Erro ao remover imagem:', error);
            setMessage({ type: 'error', content: 'Erro ao remover imagem' });
        }
    };

    // Função para limpar formulário
    const clearProductForm = () => {
        setProductForm({
            name: '',
            description: '',
            price: 0,
            stock: 0,
            category: '',
            size: '',
            color: '',
            brand: '',
            material: '',
            gender: '',
            imageUrl: ''
        });
        setImagePreview(null);
        setCurrentImageFile(null);
        setEditingProduct(null);
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = editingProduct
                ? `${API_BASE_URL}/admin/products/${editingProduct.id}`
                : `${API_BASE_URL}/admin/products`;

            const method = editingProduct ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(productForm)
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar produto');
            }

            const savedProduct: Product = await response.json();

            if (editingProduct) {
                setMessage({ type: 'success', content: 'Produto atualizado com sucesso!' });
            } else {
                setMessage({ type: 'success', content: 'Produto criado com sucesso!' });
            }

            setIsProductFormOpen(false);
            clearProductForm();

            // Recarregar produtos
            fetchProducts(searchTerm, currentPage);
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            setMessage({ type: 'error', content: 'Erro ao salvar produto' });
        }
    };

    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            description: product.description || '',
            price: product.price,
            stock: product.stock,
            category: product.category,
            size: product.size,
            color: product.color,
            brand: product.brand || '',
            material: product.material || '',
            gender: product.gender,
            imageUrl: product.imageUrl || ''
        });

        // Se produto tem imagem, mostrar preview
        if (product.imageUrl) {
            const fullUrl = product.imageUrl.startsWith('http')
                ? product.imageUrl
                : `${API_BASE_URL.replace('/api/v1', '')}${product.imageUrl}`;
            setImagePreview(fullUrl);

            // Extrair nome do arquivo da URL
            const filename = product.imageUrl.split('/').pop();
            setCurrentImageFile(filename || null);
        } else {
            setImagePreview(null);
            setCurrentImageFile(null);
        }

        setIsProductFormOpen(true);
    };

    const handleDeleteProduct = async (id: number) => {
        if (!window.confirm('Tem certeza que deseja excluir este produto?')) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir produto');
            }

            setMessage({ type: 'success', content: 'Produto excluído com sucesso!' });
            fetchProducts(searchTerm, currentPage);
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            setMessage({ type: 'error', content: 'Erro ao excluir produto' });
        }
    };

    const fetchProducts = useCallback(async (search: string, page: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${API_BASE_URL}/products?search=${encodeURIComponent(search)}&page=${page}&size=${PAGE_SIZE}`
            );

            if (!response.ok) {
                throw new Error('Erro ao carregar produtos');
            }

            const data: ProductPage = await response.json();
            setProducts(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error('Erro ao buscar produtos: ', error);
            setMessage({type: 'error', content: 'Erro ao carregar produtos'});
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setCurrentPage(0);
            fetchProducts(searchTerm, 0);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, fetchProducts]);

    useEffect(() => {
        fetchProducts(searchTerm, currentPage);
    }, [currentPage, searchTerm, fetchProducts]);

    // Funções existentes do carrinho (mantidas como estavam)
    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === product.id);

            if (existingItem) {
                if (product.stock <= 0) {
                    setMessage({type: 'error', content: 'Quantidade máxima atingida'});
                    return prevCart;
                }
                return prevCart.map(item =>
                    item.productId === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                if (product.stock === 0) {
                    setMessage({type: 'error', content: 'Produto fora de estoque'});
                    return prevCart;
                }
                return [...prevCart, {
                    productId: product.id,
                    productName: product.name,
                    price: product.price,
                    quantity: 1,
                    stock: product.stock
                }];
            }
        });

        setProducts(prevProducts =>
            prevProducts.map(item =>
                item.id === product.id
                    ? { ...item, stock: item.stock - 1}
                    : item
            )
        );
    };

    const removeFromCart = (productId: number) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === productId);

            if (existingItem && existingItem.quantity > 1) {
                return prevCart.map(item =>
                    item.productId === productId
                        ? { ...item, quantity: item.quantity - 1}
                        : item
                );
            } else {
                return prevCart.filter(item => item.productId !== productId);
            }
        });

        setProducts(prevProducts =>
            prevProducts.map(item =>
                item.id === productId
                    ? { ...item, stock: item.stock + 1}
                    : item
            )
        );
    };

    const removeItemCompletely = (productId: number) => {
        const itemToRemove = cart.find(item => item.productId === productId);
        if (itemToRemove) {
            setProducts(prevProducts =>
                prevProducts.map(item =>
                    item.id === productId
                        ? { ...item, stock: item.stock + itemToRemove.quantity}
                        : item
                )
            );
        }
        setCart(prevCart => prevCart.filter(item => item.productId !== productId));
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getCartItemCount = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const checkout = async () => {
        if (cart.length === 0) {
            setMessage({type: 'error', content: 'Carrinho Vazio'});
            return;
        }

        const orderRequest: OrderRequest = {
            items: cart.map(item => ({
                productId: item.productId,
                quantity: item.quantity
            }))
        };

        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderRequest)
            });

            if (response.status === 409) {
                const stockErrorsData: StockError[] = await response.json();
                setStockErrors(stockErrorsData);
                setMessage({type: 'error', content: 'Alguns itens não possuem estoque suficiente'});
                return;
            }

            if (!response.ok) {
                throw new Error('Erro ao finalizar pedido');
            }

            const orderData: OrderResponse = await  response.json();
            setMessage({
                type: 'success',
                content: `Pedido realizado com sucesso! ID: ${orderData.id}`
            });
            setCart([]);
            setStockErrors([]);
            setIsCartOpen(false);

            fetchProducts(searchTerm, currentPage);
        } catch (error) {
            console.error('Erro no checkout: ', error);
            setMessage({type:'error', content: 'Erro ao finalizar pedido'});
        }
    };

    const clearMessage = () => {
        setMessage(null);
        setStockErrors([]);
    };

    // Função para construir URL completa das imagens
    const getImageUrl = (imageUrl?: string): string => {
        if (!imageUrl) return '';
        if (imageUrl.startsWith('http')) return imageUrl;
        return `${API_BASE_URL.replace('/api/v1', '')}${imageUrl}`;
    };

    // Listas para os selects
    const categories = ['CAMISETA', 'CALCA', 'BERMUDA', 'SHORTS', 'VESTIDO', 'SAIA', 'BLUSA', 'JAQUETA', 'CASACO', 'TENIS', 'SAPATO', 'SANDALIA', 'BONE', 'CHAPEU', 'BOLSA', 'MOCHILA', 'CARTEIRA', 'CINTO'];
    const sizes = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XXG', 'TAMANHO_34', 'TAMANHO_36', 'TAMANHO_38', 'TAMANHO_40', 'TAMANHO_42', 'TAMANHO_44', 'TAMANHO_46', 'TAMANHO_48', 'UNICO'];
    const colors = ['AZUL', 'PRETO', 'BRANCO', 'VERMELHO', 'VERDE', 'AMARELO', 'ROSA', 'ROXO', 'LARANJA', 'MARROM', 'CINZA', 'BEGE', 'NAVY', 'VINHO', 'CREME', 'DOURADO', 'PRATEADO', 'MULTICOLOR'];
    const genders = ['MASCULINO', 'FEMININO', 'UNISSEX'];

    return (
        <div className="app">
            <header className="app-header">
                <h1>Catálogo de Produtos</h1>
                <div className="header-controls">
                    {!isAuthenticated ? (
                        <button
                            className="login-button"
                            onClick={() => setIsLoginOpen(true)}
                        >
                            👤 Login
                        </button>
                    ) : (
                        <div className="user-controls">
                            <span className="user-welcome">Olá, {user?.fullName}</span>
                            <button
                                className={`admin-button ${isAdminMode ? 'active' : ''}`}
                                onClick={() => setIsAdminMode(!isAdminMode)}
                            >
                                ⚙️ {isAdminMode ? 'Modo Cliente' : 'Modo Admin'}
                            </button>
                            <button className="logout-button" onClick={logout}>
                                🚪 Sair
                            </button>
                        </div>
                    )}
                    <button
                        className="cart-button"
                        onClick={() => setIsCartOpen(!isCartOpen)}
                        aria-label={`Abrir carrinho com ${getCartItemCount()} itens`}
                    >
                        🛒 Carrinho ({getCartItemCount()})
                    </button>
                </div>
            </header>

            {/* Modal de Login */}
            {isLoginOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        <div className="modal-header">
                            <h2>Login de Administrador</h2>
                            <button onClick={() => setIsLoginOpen(false)}>❌</button>
                        </div>
                        <form onSubmit={login} className="login-form">
                            <div className="form-group">
                                <label>Usuário:</label>
                                <input
                                    type="text"
                                    value={loginForm.username}
                                    onChange={(e) => setLoginForm({...loginForm, username: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Senha:</label>
                                <input
                                    type="password"
                                    value={loginForm.password}
                                    onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="submit-button">Entrar</button>
                                <button type="button" onClick={() => setIsLoginOpen(false)} className="cancel-button">
                                    Cancelar
                                </button>
                            </div>
                        </form>
                        <div className="login-help">
                            <p><strong>Usuário padrão:</strong> admin</p>
                            <p><strong>Senha padrão:</strong> admin123</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal de Produto */}
            {isProductFormOpen && (
                <div className="modal-overlay">
                    <div className="modal large-modal">
                        <div className="modal-header">
                            <h2>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>
                            <button onClick={() => setIsProductFormOpen(false)}>❌</button>
                        </div>
                        <form onSubmit={handleProductSubmit} className="product-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nome*:</label>
                                    <input
                                        type="text"
                                        value={productForm.name}
                                        onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Preço*:</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0.01"
                                        value={productForm.price}
                                        onChange={(e) => setProductForm({...productForm, price: parseFloat(e.target.value) || 0})}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Descrição:</label>
                                <textarea
                                    value={productForm.description}
                                    onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                                    rows={3}
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Estoque*:</label>
                                    <input
                                        type="number"
                                        min="0"
                                        value={productForm.stock}
                                        onChange={(e) => setProductForm({...productForm, stock: parseInt(e.target.value) || 0})}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Categoria*:</label>
                                    <select
                                        value={productForm.category}
                                        onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Tamanho*:</label>
                                    <select
                                        value={productForm.size}
                                        onChange={(e) => setProductForm({...productForm, size: e.target.value})}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        {sizes.map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Cor*:</label>
                                    <select
                                        value={productForm.color}
                                        onChange={(e) => setProductForm({...productForm, color: e.target.value})}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        {colors.map(color => (
                                            <option key={color} value={color}>{color}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Gênero*:</label>
                                    <select
                                        value={productForm.gender}
                                        onChange={(e) => setProductForm({...productForm, gender: e.target.value})}
                                        required
                                    >
                                        <option value="">Selecione...</option>
                                        {genders.map(gender => (
                                            <option key={gender} value={gender}>{gender}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>Marca:</label>
                                    <input
                                        type="text"
                                        value={productForm.brand}
                                        onChange={(e) => setProductForm({...productForm, brand: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label>Material:</label>
                                    <input
                                        type="text"
                                        value={productForm.material}
                                        onChange={(e) => setProductForm({...productForm, material: e.target.value})}
                                    />
                                </div>
                            </div>

                            {/* Campo de Upload de Imagem */}
                            <div className="form-group">
                                <label>Imagem do Produto:</label>
                                <div className="image-upload-container">
                                    {imagePreview ? (
                                        <div className="image-preview">
                                            <img src={imagePreview} alt="Preview" className="preview-image" />
                                            <div className="image-actions">
                                                <button
                                                    type="button"
                                                    onClick={handleRemoveImage}
                                                    className="remove-image-btn"
                                                    disabled={uploadingImage}
                                                >
                                                    🗑️ Remover
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="upload-area">
                                            <input
                                                type="file"
                                                id="imageUpload"
                                                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                                onChange={handleImageUpload}
                                                disabled={uploadingImage}
                                                style={{display: 'none'}}
                                            />
                                            <label htmlFor="imageUpload" className="upload-label">
                                                {uploadingImage ? (
                                                    <>📤 Carregando...</>
                                                ) : (
                                                    <>📁 Selecionar Imagem</>
                                                )}
                                            </label>
                                            <p className="upload-hint">
                                                JPG, PNG, GIF ou WebP • Máximo 5MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-actions">
                                <button type="submit" className="submit-button">
                                    {editingProduct ? 'Atualizar' : 'Criar'} Produto
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsProductFormOpen(false)}
                                    className="cancel-button"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {message && (
                <div className={`message ${message.type}`}>
                    <span>{message.content}</span>
                    <button
                        onClick={clearMessage}
                        aria-label="Fechar mensagem"
                    >
                        ❎
                    </button>
                </div>
            )}

            {stockErrors.length > 0 && (
                <div className="stock-errors">
                    <h3>Itens indisponíveis:</h3>
                    <ul>
                        {stockErrors.map(error => (
                            <li key={error.productId}>
                                {error.productName || `Produto ${error.productId}`}:
                                apenas {error.available} disponível(is)
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <main className="main-content">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar produtos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                        aria-label="Buscar produtos"
                    />
                    {isAdminMode && (
                        <button
                            className="add-product-button"
                            onClick={() => setIsProductFormOpen(true)}
                        >
                            ➕ Novo Produto
                        </button>
                    )}
                </div>

                <div className="products-container">
                    {isLoading ? (
                        <div className="loading">Carregando produtos...</div>
                    ) : (
                        <>
                            <div className="products-grid">
                                {products.map(product => (
                                    <div key={product.id} className="product-card">
                                        {isAdminMode && (
                                            <div className="admin-controls">
                                                <button
                                                    className="edit-button"
                                                    onClick={() => handleEditProduct(product)}
                                                    title="Editar produto"
                                                >
                                                    ✏️
                                                </button>
                                                <button
                                                    className="delete-button"
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    title="Excluir produto"
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                        )}

                                        {product.imageUrl ? (
                                            <div className="product-image">
                                                <img
                                                    src={getImageUrl(product.imageUrl)}
                                                    alt={product.name}
                                                    onError={(e) => {
                                                        // Fallback se a imagem não carregar
                                                        e.currentTarget.style.display = 'none';
                                                        e.currentTarget.parentElement!.classList.add('no-image');
                                                        e.currentTarget.parentElement!.innerHTML = '📷';
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="product-image no-image">
                                                📷
                                            </div>
                                        )}

                                        <h3>{product.name}</h3>
                                        {product.description && (
                                            <p className="product-description">{product.description}</p>
                                        )}
                                        <p className="product-price">R$ {product.price.toFixed(2)}</p>
                                        <div className="product-details">
                                            <span className="product-category">{product.category}</span>
                                            <span className="product-size">{product.size}</span>
                                            <span className="product-color">{product.color}</span>
                                        </div>
                                        {product.brand && (
                                            <p className="product-brand">{product.brand}</p>
                                        )}
                                        <p className="product-stock">
                                            Estoque: {product.stock} unidade(s)
                                        </p>

                                        {!isAdminMode && (
                                            <button
                                                onClick={() => addToCart(product)}
                                                disabled={product.stock === 0}
                                                className="add-to-cart-btn"
                                                aria-label={`Adicionar ${product.name} ao carrinho`}
                                            >
                                                {product.stock === 0 ? 'Fora de Estoque' : 'Adicionar ao Carrinho'}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="pagination">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                                    disabled={currentPage === 0}
                                    aria-label="Página anterior"
                                >
                                    Anterior
                                </button>
                                <span>
                                    Página {currentPage + 1} de {totalPages}
                                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                                    disabled={currentPage === totalPages - 1}
                                    aria-label="Próxima página"
                                >
                                    Próxima
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </main>

            {/* Carrinho (mantido como estava) */}
            {isCartOpen && (
                <div className="cart-overlay">
                    <div className="cart-sidebar">
                        <div className="cart-header">
                            <h2>Carrinho</h2>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="close-cart"
                                aria-label="fechar carrinho"
                            >
                                ❎
                            </button>
                        </div>

                        <div className="cart-content">
                            {cart.length === 0 ? (
                                <p>Carrinho vazio</p>
                            ) : (
                                <>
                                    {cart.map(item => (
                                        <div key={item.productId} className="cart-item">
                                            <h4>{item.productName}</h4>
                                            <p>R$ {item.price.toFixed(2)}</p>
                                            <div className="quantity-controls">
                                                <button
                                                    onClick={() => removeFromCart(item.productId)}
                                                    aria-label={`Diminuir quantidade de ${item.productName}`}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => addToCart({
                                                        id: item.productId,
                                                        name: item.productName,
                                                        price: item.price,
                                                        stock: item.stock,
                                                        active: true,
                                                        category: '',
                                                        size: '',
                                                        color: '',
                                                        gender: ''
                                                    })}
                                                    disabled={item.quantity >= item.stock}
                                                    aria-label={`Adicionar quantidade de ${item.productName}`}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="item-total">
                                                Subtotal: R$ {(item.price * item.quantity).toFixed(2)}
                                            </p>
                                            <button
                                                onClick={() => removeItemCompletely(item.productId)}
                                                className="remove-item"
                                                aria-label={`Remover ${item.productName} do carrinho`}
                                            >
                                                Remover
                                            </button>
                                        </div>
                                    ))}

                                    <div className="cart-total">
                                        <h3>Total: R$ {getCartTotal().toFixed(2)}</h3>
                                        <button
                                            onClick={checkout}
                                            className="checkout-btn"
                                            aria-label="Finalizar pedido"
                                        >
                                            Finalizar Pedido
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;