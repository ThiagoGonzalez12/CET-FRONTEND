import { api } from "@/api/axios";
import Cookies from "js-cookie";

export default {
    getClients(category, q, page = 1, limit = 10) {
        const token = Cookies.get("token");

        const params = {
            limit,
            page,
            category,
        };

        if (q) {
            params.q = q;
        }

        return api.get(`clients`, {
            params: params,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    getClientById(id) {
        const token = Cookies.get("token");

        return api.get(`clients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    createClient(data) {
        const token = Cookies.get("token");

        return api.post("clients", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    updateClient(id, data) {
        const token = Cookies.get("token");

        return api.put(`clients/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    deleteClient(id) {
        const token = Cookies.get("token");

        return api.delete(`clients/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
