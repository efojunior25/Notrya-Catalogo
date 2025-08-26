export interface User {
    username: string;
    fullName: string;
    email: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    type: string;
    username: string;
    fullName: string;
    email: string;
}