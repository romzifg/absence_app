import CryptoJS from 'crypto-js'

const secretKey = import.meta.env.VITE_APP_CRYPTO_SECRET

export const encrypt = (v) => {
    return CryptoJS.AES.encrypt(v, secretKey).toString();
}

export const decrypt = (v) => {
    let bytes = CryptoJS.AES.decrypt(v, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}
