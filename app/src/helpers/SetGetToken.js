import { decrypt, encrypt } from "./crypto";

export const setToken = (data) => {
    localStorage.setItem('user', encrypt(JSON.stringify(data?.user)));
    localStorage.setItem('token', data?.token);
}

export const currentUser = localStorage.getItem('user') ? JSON.parse(decrypt((localStorage.getItem('user')))) : null
export const token = localStorage.getItem('token') ? (decrypt(localStorage.getItem('token'))) : null
