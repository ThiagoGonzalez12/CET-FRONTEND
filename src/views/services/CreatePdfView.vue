<script setup>
import { Toaster, toast } from "vue-sonner";
import { useRouter } from "vue-router";
import { useSiteStore } from "@/stores/site.store.js";
import GalleryService from "@/services/GalleryService";

const siteStore = useSiteStore();
const router = useRouter();

const handleSubmit = async ({ client, PDF }) => {
    try {
        await GalleryService.createPDF({
            client,
            PDF: PDF[0].file,
        });
        toast.success("Se ha creado el PDF. En breve serás redirigido.");
        setTimeout(() => {
            router.push({ name: "site" });
        }, 3000);
    } catch (e) {
        toast.error(e.response.data.message);
    }
};
</script>

<template>
    <h1>Crear PDF</h1>

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
                name="client"
                label="Nombre de cliente"
                validation="required"
                disabled
                :value="siteStore.client"
                :validation-messages="{
                    required: 'El nombre del cliente es obligatorio',
                }"
            />

            <FormKit
                type="file"
                name="PDF"
                placeholder="PDF"
                label="Nombre de cliente"
                accept=".pdf"
                validation="required"
                :validation-messages="{
                    required: 'El PDF es obligatorio',
                    accept: 'Solo se aceptan archivos PDF',
                }"
            />

            <FormKit type="submit"> Crear PDF </FormKit>
        </FormKit>
    </section>
</template>

<style scoped>
.form-container {
    margin: 25px 0;
}
</style>
