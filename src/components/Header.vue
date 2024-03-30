<script setup>
const items = [
    {
        toPath: "cars",
        icon: "/one.svg",
        name: "cars",
        tooltip: "Coches",
    },
    {
        toPath: "machines",
        icon: "/two.svg",
        name: "machines",
        tooltip: "Máquinas",
    },
    {
        toPath: "personal-cars",
        icon: "/three.svg",
        name: "personal",
        tooltip: "Coches personales",
    },
];
</script>

<template>
    <header>
        <section class="icons-container">
            <RouterLink
                :to="{ name: item.toPath }"
                class="item"
                v-for="item in items"
                :key="item.name"
            >
                <span class="tooltip-text">{{ item.tooltip }}</span>
                <img :src="item.icon" :alt="item.name" />
            </RouterLink>
        </section>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    height: 65px;
    background-color: var(--primary-color);
}

.icons-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 45px;
}

.item {
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: var(--light-primary-color);
    position: relative;
}

img {
    max-width: 30px;
}

.tooltip-text {
    visibility: hidden;
    width: max-content;
    background-color: #1c1c1c;
    color: #fff;
    text-align: center;
    padding: 4px 8px;
    border-radius: 4px;
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 1;
    font-size: 12px;
}

.item:hover .tooltip-text {
    visibility: visible;
    opacity: 1;
}
</style>
