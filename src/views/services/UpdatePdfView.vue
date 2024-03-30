<script setup>
import { Toaster, toast } from "vue-sonner";
import { useRouter, useRoute } from "vue-router";
import GalleryService from "@/services/GalleryService";

const route = useRoute();
const router = useRouter();
const { id } = route.params;

const { data } = await GalleryService.getPDF(id);

const handleSubmit = async ({ PDF }) => {
    try {
        await GalleryService.updatePDF(id, {
            PDF: PDF[0]?.file,
        });
        toast.success("Se ha actualizado el PDF. En breve serás redirigido.");
        setTimeout(() => {
            router.push({ name: "site" });
        }, 3000);
    } catch (e) {
        toast.error(e.response.data.message);
    }
};
</script>

<template>
    <h1>Actualizar PDF</h1>

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
                disabled
                :value="data.client.client_name"
            />

            <FormKit
                type="file"
                name="PDF"
                placeholder="PDF"
                label="Nombre de cliente"
                accept=".pdf"
                validation="required"
                :validation-messages="{
                    required: 'El PDF es obligatorio.',
                    accept: 'Solo se aceptan archivos PDF',
                }"
            />

            <FormKit type="submit"> Actualizar PDF </FormKit>
        </FormKit>
    </section>
</template>

<style scoped>
.form-container {
    margin: 25px 0;
}
</style>
