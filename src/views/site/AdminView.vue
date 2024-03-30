<script setup>
import { ref } from "vue";
import UserService from "@/services/UserService";
import { useSiteStore } from "@/stores/site.store";
import TableUsers from "@/components/TableUsers.vue";

const currentPage = ref(1);
const siteStore = useSiteStore();
const {
    data: { docs, totalDocs },
} = await UserService.getUsers();
siteStore.management = docs;
siteStore.totalItems = totalDocs;

const onClickHandler = async (page) => {
    const {
        data: { docs, totalDocs },
    } = await UserService.getUsers(page);
    siteStore.management = docs;
    siteStore.totalItems = totalDocs;
};
</script>

<template>
    <section>
        <RouterLink :to="{ name: 'create-user' }" class="add">➕</RouterLink>

        <h1>Administre los usuarios</h1>

        <TableUsers v-if="siteStore.haveServices" />
        <p class="not-found" v-else>
            No hay usuarios disponibles. Pruebe agregando nuevos usuarios.
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
    margin: 0 auto;
}
</style>
