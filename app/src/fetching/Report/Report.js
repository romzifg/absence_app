import axios from "axios";

export const fetchReportAbsence = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/absence`, {
        headers: { Authorization: import.meta.env.VITE_API_TOKEN },
    })

    return data
};

export const onClickReport = () => {
    axios
        .get(`${import.meta.env.VITE_API_URL}/absence/generate-report`, {
            headers: { Authorization: import.meta.env.VITE_API_TOKEN },
        })
        .then((res) => {
            window.open(res.data.path);
        });
};