<script setup>
import Cookies from "js-cookie";
import { Toaster, toast } from "vue-sonner";
import AuthService from "@/services/AuthService";
import { useRouter } from "vue-router";

const router = useRouter();

const handleSubmit = async (values) => {
    try {
        const { data } = await AuthService.login(values);
        Cookies.set("token", data.token);
        toast.success(
            "Iniciaste sesión correctamente. En breve serás redirigido."
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
    <section class="form-container">
        <h1>Inicio de sesión</h1>

        <Toaster position="top-right" richColors />

        <FormKit
            type="form"
            @submit="handleSubmit"
            :actions="false"
            incomplete-message="No se pudo enviar el formulario. Revise los datos"
        >
            <FormKit
                type="text"
                placeholder="Nombre de usuario"
                name="username"
                label="Nombre de usuario"
                validation="required"
                :validation-messages="{
                    required: 'El nombre de usuario es obligatorio',
                }"
            />

            <FormKit
                type="password"
                placeholder="Contraseña"
                name="password"
                label="Contraseña"
                validation="required"
                :validation-messages="{
                    required: 'La contraseña es obligatoria',
                }"
            />

            <FormKit type="submit">Iniciar sesión</FormKit>
        </FormKit>
    </section>
</template>

<style scoped>
h1 {
    text-align: center;
    color: #242424;
}

.form-container {
    max-width: 1000px;
    margin: 75px auto;
    padding: 20px;
}
</style>
