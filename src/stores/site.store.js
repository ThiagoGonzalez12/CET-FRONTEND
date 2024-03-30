import { ref, computed } from "vue";
import { defineStore } from "pinia";
import SiteService from "@/services/SiteService";
import { useAuthStore } from "@/stores/auth.store";

export const useSiteStore = defineStore("site", () => {
    const authStore = useAuthStore();
    const management = ref([]);
    const category = ref("");
    const totalItems = ref(0);
    const q = ref(undefined);
    const client = ref("");

    const haveServices = computed(() => management.value.length > 0);

    const havePdfs = computed(() => {
        return (id) => {
            const site = management.value.find((item) => item._id === id);

            return site.pdfs.length > 0;
        };
    });

    const whoIsCreated = computed(() => {
        return (uid) => {
            if (!authStore.user.roles.includes("SUPERADMIN")) {
                if (authStore.user.uid !== uid) return false;
            }

            return true;
        };
    });

    const FetchServices = async (query) => {
        q.value = query;

        const {
            data: { docs, totalDocs },
        } = await SiteService.getClients(category.value, q.value);

        management.value = docs;
        totalItems.value = totalDocs;
    };

    const pagination = async (page) => {
        const {
            data: { docs, totalDocs },
        } = await SiteService.getClients(category.value, q.value, page);

        management.value = docs;
        totalItems.value = totalDocs;
    };

    return {
        management,
        totalItems,
        category,
        q,
        haveServices,
        havePdfs,
        whoIsCreated,
        client,
        FetchServices,
        pagination,
    };
});
