import { IFormDataProduct } from "@/types/Types";
import axios from "axios";

const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
const authServices = {
    create: async (data: IFormDataProduct) => {
        const res = await axios.post(`${baseUrlApi}/products`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res;
    },
    get: async () => {
        const res = await axios.get(`${baseUrlApi}/products`);
        return res;
    },
}

export default authServices;