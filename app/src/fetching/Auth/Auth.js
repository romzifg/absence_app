import axios from "axios"

export const AuthLogin = async (payload) => {
    const response = await axios
        .post(`${import.meta.env.VITE_API_URL}/auth/login`, payload, {
            headers: { Authorization: import.meta.env.VITE_API_TOKEN },
        })

    return response
}