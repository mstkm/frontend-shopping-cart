import axios from "axios";

const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
const authServices = {
    create: async () => {
        const res = await axios.post(`${baseUrlApi}/carts`, {}, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res;
    },
    get: async () => {
        const res = await axios.get(`${baseUrlApi}/carts`);
        return res;
    },
}

export default authServices;