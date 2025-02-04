import { IFormDataProduct } from "@/types/Types";
import axios from "axios";

const baseUrlApi = process.env.NEXT_PUBLIC_BASE_URL_API;
const authServices = {
    create: async (data: IFormDataProduct) => {
        const formData = new FormData();
    
        formData.append("Name", data.Name);
        formData.append("Description", data.Description);
        formData.append("Price", data.Price.toString());
        formData.append("Stock", data.Stock.toString());
        if (data.Picture) {
            formData.append("Picture", data.Picture);
        }
        
        const res = await axios.post(`${baseUrlApi}/products`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return res;
    },
    get: async () => {
        const res = await axios.get(`${baseUrlApi}/products`);
        return res;
    },
    update: async (data: IFormDataProduct, selectedId: string) => {
        const res = await axios.put(`${baseUrlApi}/products/${selectedId}`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
        return res;
    },
    delete: async (id: string) => {
        const res = await axios.delete(`${baseUrlApi}/products/${id}`);
        return res;
    }
}

export default authServices;