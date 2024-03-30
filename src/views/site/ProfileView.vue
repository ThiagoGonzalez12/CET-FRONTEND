<script setup>
import { ref, onUnmounted } from "vue";
import { useSiteStore } from "@/stores/site.store";
import { useRoute, useRouter } from "vue-router";
import SiteService from "@/services/SiteService";
import TableProfile from "@/components/TableProfile.vue";
import GalleryService from "@/services/GalleryService";

const currentPage = ref(1);
const siteStore = useSiteStore();
const route = useRoute();
const router = useRouter();
const { id } = route.params;
const { data } = await SiteService.getClientById(id);
const {
    data: { docs, totalDocs },
} = await GalleryService.getPDFS(id);
siteStore.management = docs;
siteStore.totalItems = totalDocs;
siteStore.client = data.client_name;

const deleteClient = async () => {
    await SiteService.deleteClient(id);
    router.push({ name: "site" });
};

const onClickHandler = async (page) => {
    const {
        data: { docs, totalDocs },
    } = await GalleryService.getPDFS(id, page);
    siteStore.management = docs;
    siteStore.totalItems = totalDocs;
};

onUnmounted(() => {
    siteStore.client = "";
});
</script>

<template>
    <section>
        <div class="add-container">
            <RouterLink :to="{ name: 'gallery' }" class="add">➕</RouterLink>
        </div>

        <div class="profile-wrapper">
            <div class="container">
                <img class="rounded" src="/logo.png" alt="Logo" />
                <h1>
                    Cliente: <span class="client">{{ data.client_name }}</span>
                </h1>
            </div>
            <div class="container" v-if="siteStore.whoIsCreated(data.user)">
                <Router-Link :to="{ name: 'update-client', params: { id } }">
                    <img class="icon" src="/pencil.svg" alt="Edit icon" />
                </Router-Link>
                <button @click="deleteClient">
                    <img class="icon" src="/trash.svg" alt="Delete icon" />
                </button>
            </div>
        </div>

        <TableProfile :id="id" v-if="siteStore.haveServices" />
        <p class="not-found" v-else>
            No hay PDFS disponibles. Pruebe agregando nuevos PDFS.
        </p>

        <vue-awesome-paginate
            v-if="siteStore.haveServices"
            :total-items="siteStore.totalItems"
            :items-per-page="10"
            :max-pages-shown="5"
            v-model="currentPage"
            :on-click="onClickHandler"
        />
    </section>
</template>

<style scoped>
section {
    display: grid;
    grid-template-columns: 1fr;
    gap: 20px;
}

.profile-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.container {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 8px;
}

.rounded {
    width: 100px;
    height: 100px;
    object-fit: contain;
    border-radius: 50%;
}

.client {
    font-weight: bold;
    text-transform: uppercase;
    color: #0654e9;
}

.add-container {
    width: 100%;
    display: flex;
    justify-content: center;
}
.add {
    font-size: 30px;
    color: #212121;
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    text-align: center;
    text-decoration: none;
    background-color: #dadada;
    max-width: fit-content;
}

button,
a {
    padding: 8px;
    background-color: #dadada;
    border-radius: 4px;
    border: none;
    cursor: pointer;
}

.icon {
    width: 30px;
    height: 30px;
}
</style>
