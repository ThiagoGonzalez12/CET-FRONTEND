<script setup>
import Header from "@/components/Header.vue";
</script>

<template>
    <Header />

    <section>
        <Suspense>
            <RouterView />
            <template #fallback> Cargando... </template>
        </Suspense>
    </section>
</template>

<style scoped>
section {
    max-width: 1000px;
    margin: 40px auto;
}
</style>
