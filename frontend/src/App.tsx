import React, {useCallback, useEffect, useState} from 'react';
import './App.css';

// ... (interfaces existentes permanecem as mesmas)

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

    // NOVOS Estados para upload de imagem
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const PAGE_SIZE = 6;

    // Verificar se usuário está logado ao carregar a página
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            validateToken(token);
        }
    }, []);

    // NOVA função para handle de upload de imagem
    const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Verificar tipo de arquivo
            if (!file.type.startsWith('image/')) {
                setMessage({ type: 'error', content: 'Por favor, selecione apenas arquivos de imagem.' });
                return;
            }

            // Verificar tamanho (máximo 5MB)
            if (file.size > 5 * 1024 * 1024) {
                setMessage({ type: 'error', content: 'A imagem deve ter no máximo 5MB.' });
                return;
            }

            setSelectedFile(file);

            // Criar preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // NOVA função para upload da imagem
    const uploadImage = async (): Promise<string | null> => {
        if (!selectedFile) return null;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch(`${API_BASE_URL}/uploads/images`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Erro ao fazer upload da imagem');
            }

            const result = await response.json();
            return result.url;
        } catch (error) {
            console.error('Erro no upload:', error);
            setMessage({ type: 'error', content: 'Erro ao fazer upload da imagem' });
            return null;
        } finally {
            setIsUploading(false);
        }
    };

    // Função para resetar form de produto
    const resetProductForm = () => {
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
        setSelectedFile(null);
        setImagePreview(null);
        setEditingProduct(null);
    };

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

    // ATUALIZADA função handleProductSubmit para incluir upload
    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let imageUrl = productForm.imageUrl;

        // Se há uma nova imagem selecionada, fazer upload
        if (selectedFile) {
            const uploadedUrl = await uploadImage();
            if (uploadedUrl) {
                imageUrl = uploadedUrl;
            } else {
                return; // Parar se o upload falhou
            }
        }

        try {
            const url = editingProduct
                ? `${API_BASE_URL}/admin/products/${editingProduct.id}`
                : `${API_BASE_URL}/admin/products`;

            const method = editingProduct ? 'PUT' : 'POST';

            const productData = {
                ...productForm,
                imageUrl: imageUrl
            };

            const response = await fetch(url, {
                method,
                headers: getAuthHeaders(),
                body: JSON.stringify(productData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao salvar produto');
            }

            const savedProduct: Product = await response.json();

            if (editingProduct) {
                setMessage({ type: 'success', content: 'Produto atualizado com sucesso!' });
            } else {
                setMessage({ type: 'success', content: 'Produto criado com sucesso!' });
            }

            setIsProductFormOpen(false);
            resetProductForm();

            // Recarregar produtos
            fetchProducts(searchTerm, currentPage);
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            // @ts-ignore
            setMessage({ type: 'error', content: `Erro ao salvar produto: ${error.message}` });
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

        // Se há imagem, definir como preview
        if (product.imageUrl) {
            setImagePreview(product.imageUrl);
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

    // Função para fechar modal de produto
    const closeProductModal = () => {
        setIsProductFormOpen(false);
        resetProductForm();
    };

    // ... (resto das funções permanecem iguais: fetchProducts, addToCart, removeFromCart, etc.)

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

    // Funções do carrinho (mantidas como estavam)
    const addToCart = (product: Product) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.productId === product.id);

            if (existingItem) {
                if (existingItem.quantity >= product.stock) {
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
        setMessage({type: 'success', content: `${product.name} adicionado ao carrinho!`});
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
    };

    const removeItemCompletely = (productId: number) => {
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

    // Listas para os selects (mantidas como estavam)
    const categories = ['CAMISETA', 'CALCA', 'BERMUDA', 'SHORTS', 'VESTIDO', 'SAIA', 'BLUSA', 'JAQUETA', 'CASACO', 'TENIS', 'SAPATO', 'SANDALIA', 'BONE', 'CHAPEU', 'BOLSA', 'MOCHILA', 'CARTEIRA', 'CINTO'];
    const sizes = ['PP', 'P', 'M', 'G', 'GG', 'XG', 'XXG', 'TAMANHO_34', 'TAMANHO_36', 'TAMANHO_38', 'TAMANHO_40', 'TAMANHO_42', 'TAMANHO_44', 'TAMANHO_46', 'TAMANHO_48', 'UNICO'];
    const colors = ['AZUL', 'PRETO', 'BRANCO', 'VERMELHO', 'VERDE', 'AMARELO', 'ROSA', 'ROXO', 'LARANJA', 'MARROM', 'CINZA', 'BEGE', 'NAVY', 'VINHO', 'CREME', 'DOURADO', 'PRATEADO', 'MULTICOLOR'];
    const genders = ['MASCULINO', 'FEMININO', 'UNISSEX'];

    // COMPONENTE DE UPLOAD DE IMAGEM
    const ImageUploadComponent = () => (
        <div className="form-group">
            <label>Imagem do Produto:</label>
            <div className="image-upload-container">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="image-upload-input"
                    id="image-upload"
                />
                <label htmlFor="image-upload" className="image-upload-label">
                    📁 Escolher Imagem
                </label>

                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                        <button
                            type="button"
                            onClick={() => {
                                setSelectedFile(null);
                                setImagePreview(null);
                                setProductForm({...productForm, imageUrl: ''});
                            }}
                            className="remove-image-btn"
                        >
                            ❌
                        </button>
                    </div>
                )}

                {selectedFile && (
                    <div className="selected-file-info">
                        <p>📎 {selectedFile.name}</p>
                        <p>📏 {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                )}

                <small className="image-upload-help">
                    Formatos aceitos: JPG, PNG, GIF, WebP. Máximo 5MB.
                </small>
            </div>
        </div>
    );

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
                                <div className="form-group">
                                    <label>URL da Imagem:</label>
                                    <input
                                        type="url"
                                        value={productForm.imageUrl}
                                        onChange={(e) => setProductForm({...productForm, imageUrl: e.target.value})}
                                        placeholder="https://exemplo.com/imagem.jpg"
                                    />
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

                                        {product.imageUrl && (
                                            <div className="product-image">
                                                <img src={product.imageUrl} alt={product.name} />
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