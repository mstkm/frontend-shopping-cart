import { IFromDataAddress } from "@/types/Types";
import axios from "axios";

const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
const authServices = {
    create: async (data: IFromDataAddress) => {
        const res = await axios.post(`${baseUrlApi}/addresses`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res;
    },
}

export default authServices;