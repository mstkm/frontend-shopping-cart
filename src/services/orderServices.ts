import axios from "axios";

const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
const authServices = {
    get: async () => {
        const res = await axios.get(`${baseUrlApi}/orders`);
        return res;
    },
    create: async (data: {
        CartID: number;
    }) => {
        const res = await axios.post(`${baseUrlApi}/orders`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res;
    },
}

export default authServices;