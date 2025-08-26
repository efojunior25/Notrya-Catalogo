export interface ApiResponse<T = any> {
    data: T;
    success: boolean;
    message?: string;
}

export interface PaginationParams {
    page: number;
    size: number;
    search?: string;
}

export interface ImageUploadResponse {
    success: boolean;
    url: string;
    filename: string;
    error?: string;
}