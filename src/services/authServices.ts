import { IFormDataLogin, IFormDataRegister } from "@/types/Types";
import axios from "axios";

const baseURL = process.env.BASE_URL;
const authServices = {
    register: async (data: IFormDataRegister) => {
        const res = await axios.post(`${baseURL}/users/register`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res;
    },
    login: async (data: IFormDataLogin) => {
        const res = await axios.post(`${baseURL}/users/login`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res;
    },
    getUser: async(token: string) => {
        const res = await axios.get(`${baseURL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        return res;
    }
}

export default authServices;