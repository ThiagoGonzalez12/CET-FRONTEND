import { api } from "@/api/axios";
import Cookies from "js-cookie";

export default {
    getPDFS(id, page, limit = 10) {
        const token = Cookies.get("token");

        return api.get(`/gallery/${id}`, {
            params: {
                page,
                limit,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    getPDF(id) {
        const token = Cookies.get("token");

        return api.get(`/gallery/pdf/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    createPDF(data) {
        const token = Cookies.get("token");

        return api.post(`/gallery`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    },
    updatePDF(id, data) {
        const token = Cookies.get("token");

        return api.put(`/gallery/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data",
            },
        });
    },
    deletePDF(id) {
        const token = Cookies.get("token");

        return api.delete(`/gallery/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
