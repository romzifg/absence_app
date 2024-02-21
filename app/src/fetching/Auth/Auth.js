import axios from "axios"

export const AuthLogin = async (payload) => {
    const data = await axios
        .post(`${import.meta.env.VITE_API_URL}/auth/login`, payload, {
            headers: { Authorization: import.meta.env.VITE_API_TOKEN },
        })

    return data
    // .then((res) => {
    //     setToken(res.data.data);
    //     navigate("/report");
    // })
    // .catch((err) => {
    //     toast.error(err.response.data.message, {
    //         position: "top-center",
    //     });
    // });
}