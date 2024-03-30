import { createRouter, createWebHistory } from "vue-router";
import AuthService from "@/services/AuthService";
import { useAuthStore } from "@/stores/auth.store";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            redirect: (to) => {
                return { name: "login" };
            },
        },
        {
            path: "/login",
            name: "login",
            component: () => import("../views/LoginView.vue"),
        },
        {
            path: "/site",
            component: () => import("../views/site/SiteLayout.vue"),
            meta: {
                auth: true,
            },
            children: [
                {
                    path: "",
                    name: "site",
                    redirect: (to) => {
                        return { name: "cars" };
                    },
                },
                {
                    path: "cars",
                    name: "cars",
                    component: () => import("../views/site/CarsView.vue"),
                },
                {
                    path: "machines",
                    name: "machines",
                    component: () => import("../views/site/MachinesView.vue"),
                },
                {
                    path: "personal-cars",
                    name: "personal-cars",
                    component: () =>
                        import("../views/site/PersonalCarsView.vue"),
                },
                {
                    path: "admin",
                    name: "admin",
                    component: () => import("../views/site/AdminView.vue"),
                    meta: {
                        admin: true,
                    },
                },
                {
                    path: "profile/:id",
                    name: "profile",
                    component: () => import("../views/site/ProfileView.vue"),
                },
            ],
        },
        {
            path: "/services",
            redirect: (to) => {
                return { name: "create-client" };
            },
            component: () => import("../views/services/ClientLayout.vue"),
            meta: {
                auth: true,
            },
            children: [
                {
                    path: "create",
                    name: "create-client",
                    component: () =>
                        import("../views/services/CreateClientView.vue"),
                },
                {
                    path: "update/:id",
                    name: "update-client",
                    component: () =>
                        import("../views/services/UpdateClientView.vue"),
                },
                {
                    path: "create/gallery",
                    name: "gallery",
                    component: () =>
                        import("../views/services/CreatePdfView.vue"),
                },
                {
                    path: "update/gallery/:id",
                    name: "update-gallery",
                    component: () =>
                        import("../views/services/UpdatePdfView.vue"),
                },
                {
                    path: "users/create",
                    name: "create-user",
                    component: () => import("../views/site/CreateUserView.vue"),
                    meta: {
                        admin: true,
                    },
                },
                {
                    path: "users/update/:id",
                    name: "update-user",
                    component: () => import("../views/site/UpdateUserView.vue"),
                    meta: {
                        admin: true,
                    },
                },
            ],
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    const authRequired = to.matched.some((url) => url.meta.auth);
    const authStore = useAuthStore();

    if (authRequired) {
        try {
            const { data } = await AuthService.userAuthenticated();
            authStore.user = data;
            next();
        } catch (e) {
            next({ name: "login" });
        }
    } else {
        next();
    }
});

router.beforeEach(async (to, from, next) => {
    const adminRequired = to.meta.admin;

    if (adminRequired) {
        try {
            await AuthService.userAdmin();
            next();
        } catch {
            try {
                await AuthService.userAuthenticated();
                next({ name: "site" });
            } catch {
                next({ name: "login" });
            }
        }
    } else {
        next();
    }
});

export default router;
