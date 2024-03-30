<script setup>
import { Toaster, toast } from "vue-sonner";
import { useSiteStore } from "@/stores/site.store";
import { formatDate } from "@/utils/date";
import GalleryService from "@/services/GalleryService";

const siteStore = useSiteStore();
const URL = import.meta.env.VITE_API_URL;
const props = defineProps(["id"]);

const deleteClient = async (id) => {
    try {
        await GalleryService.deletePDF(id);
        const {
            data: { docs, totalDocs },
        } = await GalleryService.getPDFS(props.id);
        siteStore.management = docs;
        siteStore.totalItems = totalDocs;
        toast.success("Se ha eliminado el pdf satisfactoriamente.");
    } catch (e) {
        toast.error(e.response.data.message);
    }
};
</script>

<template>
    <Toaster position="top-right" richColors />

    <table class="t-head">
        <thead>
            <tr class="tr-head">
                <td class="td-title">PDF</td>
                <td class="td-title">Fecha</td>
                <td class="td-title">Editar</td>
                <td class="td-title">Borrar</td>
            </tr>
        </thead>
        <tbody>
            <tr
                class="tr-body"
                v-for="pdf in siteStore.management"
                :key="pdf._id"
            >
                <td class="td-body">
                    <a :href="URL + '/uploads' + pdf.pdf"> PDF </a>
                </td>
                <td class="td-body">{{ formatDate(pdf.updatedAt) }}</td>
                <td v-if="siteStore.whoIsCreated(pdf.user)">
                    <RouterLink
                        :to="{
                            name: 'update-gallery',
                            params: { id: pdf._id },
                        }"
                    >
                        <img class="icon" src="/pencil.svg" alt="Edit icon" />
                    </RouterLink>
                </td>
                <td v-else><button class="icon" disabled>🚫</button></td>
                <td v-if="siteStore.whoIsCreated(pdf.user)">
                    <button @click="deleteClient(pdf._id)">
                        <img class="icon" src="/trash.svg" alt="Trash icon" />
                    </button>
                </td>
                <td v-else><button class="icon" disabled>🚫</button></td>
            </tr>
        </tbody>
    </table>
</template>

<style scoped>
.t-head {
    width: 100%;
}

.icon {
    width: 30px;
    height: 30px;
}

.icon:disabled {
    cursor: auto;
}

button,
a {
    cursor: pointer;
    background: transparent;
    border: none;
}

.icon {
    width: 30px;
    height: 30px;
}
</style>
