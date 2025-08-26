import React, { useState, useEffect } from 'react';
import { Product, ProductFormData } from '../../../types';
import { Button, Input, Modal } from '../../common';
import {
    FormContainer,
    FormRow,
    FormGroup,
    Label,
    Select,
    TextArea,
    ImageUploadContainer,
    UploadArea,
    UploadLabel,
    UploadHint,
    PreviewImage,
    ImageActions,
    RemoveImageButton,
    FormActions,
} from './ProductForm.styles';

interface ProductFormProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProductFormData) => Promise<{ success: boolean; error?: string }>;
    onUploadImage: (file: File) => Promise<{ success: boolean; data?: any; error?: string }>;
    onDeleteImage: (filename: string) => Promise<{ success: boolean; error?: string }>;
    editingProduct?: Product | null;
    title?: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({
                                                            isOpen,
                                                            onClose,
                                                            onSubmit,
                                                            onUploadImage,
                                                            onDeleteImage,
                                                            editingProduct,
                                                            title = 'Produto',
                                                        }) => {
    const [formData, setFormData] = useState<ProductFormData>({
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
        imageUrl: '',
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [currentImageFile, setCurrentImageFile] = useState<string | null>(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Listas para os selects
    const categories = [
        'CAMISETA', 'CALCA', 'BERMUDA', 'SHORTS', 'VESTIDO',
        'SAIA', 'BLUSA', 'JAQUETA', 'CASACO', 'TENIS',
        'SAPATO', 'SANDALIA', 'BONE', 'CHAPEU', 'BOLSA',
        'MOCHILA', 'CARTEIRA', 'CINTO'
    ];

    const sizes = [
        'PP', 'P', 'M', 'G', 'GG', 'XG', 'XXG',
        'TAMANHO_34', 'TAMANHO_36', 'TAMANHO_38', 'TAMANHO_40',
        'TAMANHO_42', 'TAMANHO_44', 'TAMANHO_46', 'TAMANHO_48',
        'UNICO'
    ];

    const colors = [
        'AZUL', 'PRETO', 'BRANCO', 'VERMELHO', 'VERDE',
        'AMARELO', 'ROSA', 'ROXO', 'LARANJA', 'MARROM',
        'CINZA', 'BEGE', 'NAVY', 'VINHO', 'CREME',
        'DOURADO', 'PRATEADO', 'MULTICOLOR'
    ];

    const genders = ['MASCULINO', 'FEMININO', 'UNISSEX'];

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                name: editingProduct.name,
                description: editingProduct.description || '',
                price: editingProduct.price,
                stock: editingProduct.stock,
                category: editingProduct.category,
                size: editingProduct.size,
                color: editingProduct.color,
                brand: editingProduct.brand || '',
                material: editingProduct.material || '',
                gender: editingProduct.gender,
                imageUrl: editingProduct.imageUrl || '',
            });

            if (editingProduct.imageUrl) {
                const fullUrl = editingProduct.imageUrl.startsWith('http')
                    ? editingProduct.imageUrl
                    : `http://localhost:8080${editingProduct.imageUrl}`;
                setImagePreview(fullUrl);
                const filename = editingProduct.imageUrl.split('/').pop();
                setCurrentImageFile(filename || null);
            }
        } else {
            // Reset form for new product
            setFormData({
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
                imageUrl: '',
            });
            setImagePreview(null);
            setCurrentImageFile(null);
        }
    }, [editingProduct]);

    const handleInputChange = (field: keyof ProductFormData, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validações
        if (file.size > 5 * 1024 * 1024) {
            alert('Arquivo muito grande. Máximo 5MB');
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            alert('Tipo de arquivo não permitido. Use JPG, PNG, GIF ou WebP');
            return;
        }

        setUploadingImage(true);

        try {
            const result = await onUploadImage(file);

            if (result.success && result.data) {
                const fullUrl = `http://localhost:8080${result.data.url}`;
                setImagePreview(fullUrl);
                setCurrentImageFile(result.data.filename);
                setFormData(prev => ({ ...prev, imageUrl: result.data.url }));
            } else {
                alert(result.error || 'Erro no upload da imagem');
            }
        } catch (error) {
            alert('Erro no upload da imagem');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleRemoveImage = async () => {
        if (!currentImageFile) return;

        try {
            const result = await onDeleteImage(currentImageFile);
            if (result.success) {
                setImagePreview(null);
                setCurrentImageFile(null);
                setFormData(prev => ({ ...prev, imageUrl: '' }));
            }
        } catch (error) {
            console.error('Error removing image:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const result = await onSubmit(formData);
            if (result.success) {
                onClose();
            } else {
                alert(result.error || 'Erro ao salvar produto');
            }
        } catch (error) {
            alert('Erro ao salvar produto');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editingProduct ? `Editar ${title}` : `Novo ${title}`}
            size="large"
        >
            <FormContainer onSubmit={handleSubmit}>
                <FormRow>
                    <FormGroup>
                        <Input
                            label="Nome *"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            required
                            fullWidth
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            label="Preço *"
                            type="number"
                            step="0.01"
                            min="0.01"
                            value={formData.price}
                            onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                            required
                            fullWidth
                        />
                    </FormGroup>
                </FormRow>

                <FormGroup>
                    <Label htmlFor="description">Descrição</Label>
                    <TextArea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        rows={3}
                        placeholder="Descreva o produto..."
                    />
                </FormGroup>

                <FormRow>
                    <FormGroup>
                        <Input
                            label="Estoque *"
                            type="number"
                            min="0"
                            value={formData.stock}
                            onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                            required
                            fullWidth
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="category">Categoria *</Label>
                        <Select
                            id="category"
                            value={formData.category}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            required
                        >
                            <option value="">Selecione...</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </Select>
                    </FormGroup>
                </FormRow>

                <FormRow>
                    <FormGroup>
                        <Label htmlFor="size">Tamanho *</Label>
                        <Select
                            id="size"
                            value={formData.size}
                            onChange={(e) => handleInputChange('size', e.target.value)}
                            required
                        >
                            <option value="">Selecione...</option>
                            {sizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor="color">Cor *</Label>
                        <Select
                            id="color"
                            value={formData.color}
                            onChange={(e) => handleInputChange('color', e.target.value)}
                            required
                        >
                            <option value="">Selecione...</option>
                            {colors.map(color => (
                                <option key={color} value={color}>{color}</option>
                            ))}
                        </Select>
                    </FormGroup>
                </FormRow>

                <FormRow>
                    <FormGroup>
                        <Label htmlFor="gender">Gênero *</Label>
                        <Select
                            id="gender"
                            value={formData.gender}
                            onChange={(e) => handleInputChange('gender', e.target.value)}
                            required
                        >
                            <option value="">Selecione...</option>
                            {genders.map(gender => (
                                <option key={gender} value={gender}>{gender}</option>
                            ))}
                        </Select>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            label="Marca"
                            value={formData.brand}
                            onChange={(e) => handleInputChange('brand', e.target.value)}
                            fullWidth
                        />
                    </FormGroup>
                </FormRow>

                <FormGroup>
                    <Input
                        label="Material"
                        value={formData.material}
                        onChange={(e) => handleInputChange('material', e.target.value)}
                        fullWidth
                    />
                </FormGroup>

                <FormGroup>
                    <Label>Imagem do Produto</Label>
                    <ImageUploadContainer>
                        {imagePreview ? (
                            <div>
                                <PreviewImage src={imagePreview} alt="Preview" />
                                <ImageActions>
                                    <RemoveImageButton
                                        type="button"
                                        onClick={handleRemoveImage}
                                        disabled={uploadingImage}
                                    >
                                        🗑️ Remover
                                    </RemoveImageButton>
                                </ImageActions>
                            </div>
                        ) : (
                            <UploadArea>
                                <input
                                    type="file"
                                    id="imageUpload"
                                    accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                                    onChange={handleImageUpload}
                                    disabled={uploadingImage}
                                    style={{ display: 'none' }}
                                />
                                <UploadLabel
                                    htmlFor="imageUpload"
                                    disabled={uploadingImage}
                                >
                                    {uploadingImage ? '📤 Carregando...' : '📁 Selecionar Imagem'}
                                </UploadLabel>
                                <UploadHint>
                                    JPG, PNG, GIF ou WebP • Máximo 5MB
                                </UploadHint>
                            </UploadArea>
                        )}
                    </ImageUploadContainer>
                </FormGroup>

                <FormActions>
                    <Button
                        type="submit"
                        variant="primary"
                        loading={isSubmitting}
                        disabled={isSubmitting}
                    >
                        {editingProduct ? 'Atualizar' : 'Criar'} Produto
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </Button>
                </FormActions>
            </FormContainer>
        </Modal>
    );
};