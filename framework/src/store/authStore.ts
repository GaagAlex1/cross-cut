import {create} from 'zustand';

interface AuthState {
    email: string;
    password: string;
    isAuthenticated: boolean;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    login: () => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    email: '',
    password: '',
    isAuthenticated: false,
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    login: () => set({ isAuthenticated: true }),
    logout: () => set({ isAuthenticated: false, email: '', password: '' }),
}));
