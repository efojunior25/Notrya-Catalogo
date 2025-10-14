export const getImageUrl = (imageUrl?: string): string => {
    if (!imageUrl) return '';
    if (imageUrl.startsWith('http')) return imageUrl;

    const baseUrl = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';
    return `${baseUrl.replace(/\/+$/, '')}${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
};