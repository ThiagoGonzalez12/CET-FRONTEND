<script setup>
import { Toaster, toast } from "vue-sonner";
import { useRouter, useRoute } from "vue-router";
import UserService from "@/services/UserService";

const router = useRouter();
const route = useRoute();
const { id } = route.params;

const { data } = await UserService.getUser(id);

const handleSubmit = async (values) => {
    try {
        await UserService.updateUser(id, values);
        toast.success(
            "Se ha actualizado el usuario. En breve serás redirigido."
        );
        setTimeout(() => {
            router.push({ name: "admin" });
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
                name="username"
                placeholder="Nombre de usuario"
                label="Nombre de usuario"
                :value="data.username"
            />

            <FormKit
                type="password"
                name="password"
                placeholder="Contraseña"
                label="Contraseña"
            />

            <FormKit
                type="checkbox"
                name="roles"
                placeholder="Roles"
                multiple
                label="Roles"
                :value="data.roles"
                :options="['ADMIN', 'SUPERADMIN']"
            />

            <FormKit type="submit"> Actualizar usuario </FormKit>
        </FormKit>
    </section>
</template>

<style scoped>
.form-container {
    margin: 25px 0;
}
</style>
