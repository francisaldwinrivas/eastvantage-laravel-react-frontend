export interface LoginInput {
    email: string;
    password: string;
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

export interface DashboardProps {
    setAccessToken: (accessToken: string|null) => void;
    currentUser: User|null;
}

export interface LoginProps {
    setAccessToken: (accessToken: string|null) => void;
    setCurrentUser: (user: User|null) => void;
}

export interface UserFormInput {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
    roles: number[]
}

export interface EditMode {
    mode: boolean;
    user: User|null;
}

export interface UserFormProps {
    setAddMode: (addMode: boolean) => void;
    populateList: () => void;
}

export interface UserList {
    users: User[]|null;
    isAdmin: boolean|undefined;
    populateList: () => void;
}