export interface LoginInput {
    email: string;
    password: string;
}

export interface Role {
    id: number;
    name: string;
}

export interface DashboardProps extends LoginProps {}

export interface LoginProps {
    setAccessToken: (accessToken: string|null) => void;
}

export interface UserFormInput {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    roles: number[]
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[]
}

export interface Role {
    id: number;
    name: string;
}

export interface UserFormProps {
    setAddMode: (addMode: boolean) => void;
    setUsers: (users: User[]|null) => void;
}

export interface UserList {
    users: User[]|null
}