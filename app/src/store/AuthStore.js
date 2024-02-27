import { create } from 'zustand';

const storeLogin = create((set) => ({
    isLogin: false,
    authData: null,
    token: null,
    setData: () => set((state) => ({
        isLogin: state.count,
        authData: state.authData,
        token: state.token
    })),
}));

export default storeLogin;