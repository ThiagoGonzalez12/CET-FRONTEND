<script setup>
import { useSiteStore } from "@/stores/site.store";
import { formatDate } from "@/utils/date";
const URL = import.meta.env.VITE_API_URL;

const siteStore = useSiteStore();
const props = defineProps(["management"]);
</script>

<template>
    <table class="t-head">
        <thead>
            <tr class="tr-head">
                <td class="td-title">Nombre</td>
                <td class="td-title">Fecha</td>
                <td class="td-title">PDF</td>
            </tr>
        </thead>
        <tbody>
            <tr
                class="tr-body"
                v-for="site in siteStore.management"
                :key="site._id"
            >
                <td class="td-body">
                    <Router-Link
                        :to="{ name: 'profile', params: { id: site._id } }"
                    >
                        {{ site.client_name }}
                    </Router-Link>
                </td>
                <td class="td-body">{{ formatDate(site.updatedAt) }}</td>
                <td class="td-body">
                    <a
                        v-if="siteStore.havePdfs(site._id)"
                        :href="
                            URL +
                            '/uploads' +
                            site.pdfs[site.pdfs.length - 1].pdf
                        "
                    >
                        PDF
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>
