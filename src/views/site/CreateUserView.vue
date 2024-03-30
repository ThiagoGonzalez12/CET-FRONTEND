<script setup>
import { Toaster, toast } from "vue-sonner";
import { useRouter } from "vue-router";
import UserService from "@/services/UserService";

const router = useRouter();

const handleSubmit = async (values) => {
    try {
        await UserService.createUser(values);
        toast.success("Se ha creado el usuario. En breve serás redirigido.");
        setTimeout(() => {
            router.push({ name: "admin" });
        }, 3000);
    } catch (e) {
        toast.error(e.response.data.message);
    }
};
</script>

<template>
    <h1>Crear servicio</h1>

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
                validation="required"
                :validation-messages="{
                    required: 'El nombre de usuario es obligatorio.',
                }"
            />

            <FormKit
                type="password"
                name="password"
                placeholder="Contraseña"
                label="Contraseña"
                validation="required"
                :validation-messages="{
                    required: 'La contraseña es obligatoria',
                }"
            />

            <FormKit
                type="checkbox"
                name="roles"
                placeholder="Roles"
                multiple
                label="Roles"
                validation="required"
                :options="['ADMIN', 'SUPERADMIN']"
                :validation-messages="{
                    required: 'El rol es obligatorio.',
                }"
            />

            <FormKit type="submit"> Crear usuario </FormKit>
        </FormKit>
    </section>
</template>

<style scoped>
.form-container {
    margin: 25px 0;
}
</style>
