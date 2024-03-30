<script setup>
import { Toaster, toast } from "vue-sonner";
import { useSiteStore } from "@/stores/site.store";
import UserService from "@/services/UserService";

const siteStore = useSiteStore();
const props = defineProps(["id"]);

const deleteClient = async (id) => {
    try {
        await UserService.deleteUser(id);
        const {
            data: { docs, totalDocs },
        } = await UserService.getUsers();
        siteStore.management = docs;
        siteStore.totalItems = totalDocs;
        toast.success("Se ha eliminado el pdf con éxito.");
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
                <td class="td-title">Nombre de usuario</td>
                <td class="td-title">Editar</td>
                <td class="td-title">Borrar</td>
            </tr>
        </thead>
        <tbody>
            <tr
                class="tr-body"
                v-for="user in siteStore.management"
                :key="user._id"
            >
                <td class="td-body">
                    {{ user.username }}
                </td>
                <td>
                    <RouterLink
                        :to="{
                            name: 'update-user',
                            params: { id: user._id },
                        }"
                    >
                        <img class="icon" src="/pencil.svg" alt="Edit icon" />
                    </RouterLink>
                </td>
                <td>
                    <button @click="deleteClient(user._id)">
                        <img class="icon" src="/trash.svg" alt="Trash icon" />
                    </button>
                </td>
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
