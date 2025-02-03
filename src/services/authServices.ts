import { IFormDataLogin, IFormDataRegister } from "@/types/Types";
import axios from "axios";

const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
const authServices = {
    register: async (data: IFormDataRegister) => {
        const res = await axios.post(`${baseUrlApi}/users/register`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res;
    },
    login: async (data: IFormDataLogin) => {
        const res = await axios.post(`${baseUrlApi}/users/login`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res;
    },
    getUser: async(token: string) => {
        const res = await axios.get(`${baseUrlApi}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res;
    }
}

export default authServices;