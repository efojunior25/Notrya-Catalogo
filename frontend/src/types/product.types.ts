export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: ProductCategory;
    size: ProductSize;
    color: ProductColor;
    brand?: string;
    material?: string;
    gender: ProductGender;
    imageUrl?: string;
    active: boolean;
}

export interface ProductPage {
    content: Product[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

export interface ProductFormData {
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

export type ProductCategory =
    | 'CAMISETA' | 'CALCA' | 'BERMUDA' | 'SHORTS' | 'VESTIDO'
    | 'SAIA' | 'BLUSA' | 'JAQUETA' | 'CASACO' | 'TENIS'
    | 'SAPATO' | 'SANDALIA' | 'BONE' | 'CHAPEU' | 'BOLSA'
    | 'MOCHILA' | 'CARTEIRA' | 'CINTO';

export type ProductSize =
    | 'PP' | 'P' | 'M' | 'G' | 'GG' | 'XG' | 'XXG'
    | 'TAMANHO_34' | 'TAMANHO_36' | 'TAMANHO_38' | 'TAMANHO_40'
    | 'TAMANHO_42' | 'TAMANHO_44' | 'TAMANHO_46' | 'TAMANHO_48'
    | 'UNICO';

export type ProductColor =
    | 'AZUL' | 'PRETO' | 'BRANCO' | 'VERMELHO' | 'VERDE'
    | 'AMARELO' | 'ROSA' | 'ROXO' | 'LARANJA' | 'MARROM'
    | 'CINZA' | 'BEGE' | 'NAVY' | 'VINHO' | 'CREME'
    | 'DOURADO' | 'PRATEADO' | 'MULTICOLOR';

export type ProductGender = 'MASCULINO' | 'FEMININO' | 'UNISSEX';