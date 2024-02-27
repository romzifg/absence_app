import axios from "axios"

export const AbsencePost = async (payload) => {
    const response = axios
        .post(
            `${import.meta.env.VITE_API_URL}/absence/testing`,
            {
                qr: payload,
            },
            { headers: { Authorization: import.meta.env.VITE_API_TOKEN } }
        )

    return response
}

// Old
// axios
//     .post(
//         `${import.meta.env.VITE_API_URL}/absence/testing`,
//         {
//             qr: event?.target?.value,
//         },
//         { headers: { Authorization: import.meta.env.VITE_API_TOKEN } }
//     )
//     .then((res) => {
//         setTimeout(() => {
//             scanValueRef.current.value = null;
//             scanValueRef?.current?.focus();
//         }, 2000);
//         setIsFailed(false);
//         setIsHide(false);
//         setTimeout(() => {
//             setIsHide(true);
//         }, 2000);
//     })
//     .catch((err) => {
//         setTimeout(() => {
//             scanValueRef.current.value = null;
//             scanValueRef?.current?.focus();
//         }, 2000);
//         setIsFailed(true);
//         setTimeout(() => {
//             setIsFailed(false);
//         }, 2000);
//     });