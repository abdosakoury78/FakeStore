export interface User {
    email: string;
    password: string;
    name: string;
    avatar: string;
    role: 'customer' | 'admin';
    id: number;
}
