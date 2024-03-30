<script setup>
import { Toaster, toast } from "vue-sonner";
import { useRouter, useRoute } from "vue-router";
import SiteService from "@/services/SiteService";

const router = useRouter();
const route = useRoute();
const { id } = route.params;
const { data } = await SiteService.getClientById(id);

const handleSubmit = async (values) => {
    try {
        await SiteService.updateClient(id, values);
        toast.success(
            "Se ha actualizado el cliente. En breve serás redirigido."
        );
        setTimeout(() => {
            router.push({ name: "site" });
        }, 3000);
    } catch (e) {
        toast.error(e.response.data.message);
    }
};
</script>

<template>
    <h1>Actualizar servicio</h1>

    <Toaster position="top-right" richColors />

    <section class="form-container">
        <FormKit
            type="form"
            :actions="false"
            @submit="handleSubmit"
            incomplete-message="No se pudo enviar el formulario. Revise los datos"
        >
            <FormKit
                type="text"
                name="category"
                label="Categoría"
                :value="data.category"
                disabled
                validation="required|matches:personal,cars,machines"
                :validation-messages="{
                    required: 'La categoría es obligatoria',
                    matches: 'Categoría no aceptada',
                }"
            />

            <FormKit
                type="text"
                name="client_name"
                placeholder="Nombre de cliente"
                label="Nombre de cliente"
                :value="data.client_name"
                validation="required|length:3,16"
                :validation-messages="{
                    required: 'El nombre de cliente es obligatorio',
                    length: 'El nombre de cliente debe tener entre 3 y 16 caracteres',
                }"
            />

            <FormKit type="submit"> Crear cliente </FormKit>
        </FormKit>
    </section>
</template>

<style scoped>
.form-container {
    margin: 25px 0;
}
</style>
