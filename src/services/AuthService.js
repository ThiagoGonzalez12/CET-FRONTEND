import { api } from "@/api/axios";
import Cookies from "js-cookie";

export default {
    login(data) {
        return api.post("/auth/login", data);
    },
    userAuthenticated() {
        const token = Cookies.get("token");

        return api.get("/auth/user", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
    userAdmin() {
        const token = Cookies.get("token");

        return api.get("/auth/admin", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    },
};
