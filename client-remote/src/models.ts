export interface Host{
    id: number;
    name: string;
    ip: string;
    tags: string[];
    user: User[];
    port: number;
}

export interface User{
    user_id: number;
    username: string;
    password: string;
}