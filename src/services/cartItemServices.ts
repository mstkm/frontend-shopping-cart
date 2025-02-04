import { ICartItem } from "@/types/Types";
import axios from "axios";

const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
const authServices = {
    create: async (data: ICartItem) => {
        const res = await axios.post(`${baseUrlApi}/cart-items`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res;
    },
    get: async () => {
        const res = await axios.get(`${baseUrlApi}/cart-items`);
        return res;
    }
}

export default authServices;