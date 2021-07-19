<template>
    <div class="container mt-5">
        <form class="row g-3" @submit.prevent="register()">
            <div class="col-12">
                <label for="fullName" class="form-label">Name</label>
                <input
                    v-model="formData.name"
                    type="text"
                    class="form-control"
                    id="fullName"
                    name="name"
                    placeholder="John Doe"
                />
            </div>

            <div class="col-md-12">
                <label for="inputEmail4" class="form-label">Email</label>
                <input
                    name="email"
                    v-model="formData.email"
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                />
            </div>
            <div class="col-12">
                <label for="phoneNumber" class="form-label">Phone</label>
                <input
                    v-model="formData.phoneNumber"
                    name="phone_number"
                    type="text"
                    class="form-control"
                    id="phoneNumber"
                    placeholder="+1343-434-4444"
                />
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Password</label>
                <input
                    name="password"
                    v-model="formData.password"
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                />
            </div>
            <div class="col-md-6">
                <label for="passwordConfirm" class="form-label">Confirm Password</label>
                <input
                    name="password_confirmation"
                    v-model="formData.passwordConfirm"
                    type="password"
                    class="form-control"
                    id="passwordConfirm"
                />
            </div>

            <div class="col-12">
                <button type="submit" class="btn btn-primary">Register</button>
            </div>
        </form>
    </div>
</template>
<script lang="ts">
    import { defineComponent, ref } from "vue";

    export default defineComponent({
        setup() {
            const formData = ref({
                name: "",
                email: "",
                password: "",
                passwordConfirm: "",
                phoneNumber: ""
            });

            // ? REGISTER FUNCTION
            const register = (): void => {
                console.log(
                    `
                    ${formData.value.name}
                    ${formData.value.email}
                    ${formData.value.phoneNumber}
                    ${formData.value.password}
                    `
                );
            };
            return {
                formData,
                register
            };
        }
    });
</script>
<style lang="scss"></style>
