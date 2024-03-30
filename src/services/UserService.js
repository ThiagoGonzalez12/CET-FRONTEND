import { api } from "@/api/axios";
import Cookies from "js-cookie";

export default {
    getUsers(page, limit = 10) {
        const token = Cookies.get("token");

        return api.get("/users", {
            params: {
                page: page,
                limit: limit,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    getUser(id) {
        const token = Cookies.get("token");

        return api.get(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    createUser(data) {
        const token = Cookies.get("token");

        return api.post("/users", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    updateUser(id, data) {
        const token = Cookies.get("token");

        return api.put(`/users/${id}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    deleteUser(id) {
        const token = Cookies.get("token");

        return api.delete(`/users/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
