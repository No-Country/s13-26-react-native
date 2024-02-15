import { create, set } from 'zustand';

type AuthStore = {
  email: string;
  password: string;
  authres: UserCredential;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setAuthRes: (authres: string) => void;
  clearAll: () => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  email: '',
  password: '',
  authres: {},
  setEmail: (email) => {
    set((state) => ({ email: email }));
  },
  setPassword: (password) => {
    set((state) => ({ password: password }));
  },
  setAuthRes: (authres) => {
    set((state) => ({ authres: authres }));
  },
  clearAll: () => {
    set((state) => ({
      email: '',
      password: '',
      authres: '',
    }));
  },
}));
