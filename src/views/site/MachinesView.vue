<script setup>
import { ref } from "vue";
import { useSiteStore } from "@/stores/site.store";
import Table from "@/components/Table.vue";

const currentPage = ref(1);
const siteStore = useSiteStore();
siteStore.category = "machines";

const handleSubmit = async ({ client }) => {
    await siteStore.FetchServices(client);
};

const onClickHandler = async (page) => {
    await siteStore.pagination(page);
};

await siteStore.FetchServices(undefined);
</script>

<template>
    <section>
        <RouterLink :to="{ name: 'create-client' }" class="add">➕</RouterLink>

        <FormKit type="form" :actions="false" @submit="handleSubmit">
            <FormKit
                name="client"
                type="text"
                suffix-icon="search"
                placeholder="Search"
            />
        </FormKit>

        <Table v-if="siteStore.haveServices" />
        <p class="not-found" v-else>
            No hay servicios disponibles. Pruebe agregando nuevos servicios.
        </p>

        <vue-awesome-paginate
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

.not-found {
    color: #1c1c1c;
    text-align: center;
    margin: 15px 0;
    font-size: 22px;
}
</style>
