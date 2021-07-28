<template>
    <div class="container mt-5">
        <form class="row g-3" @submit.prevent="register()">
            <div class="col-12">
                <label for="fullName" class="form-label">Name</label>
                <input
                    id="fullName"
                    v-model="formData.name"
                    type="text"
                    class="form-control"
                    name="name"
                    placeholder="John Doe"
                />
            </div>

            <div class="col-md-12">
                <label for="inputEmail4" class="form-label">Email</label>
                <input
                    id="inputEmail4"
                    v-model="formData.email"
                    name="email"
                    type="email"
                    class="form-control"
                />
            </div>
            <div class="col-12">
                <label for="phoneNumber" class="form-label">Phone</label>
                <input
                    id="phoneNumber"
                    v-model="formData.phoneNumber"
                    name="phone_number"
                    type="text"
                    class="form-control"
                    placeholder="+1343-434-4444"
                />
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Password</label>
                <input
                    id="inputPassword4"
                    v-model="formData.password"
                    name="password"
                    type="password"
                    class="form-control"
                />
            </div>
            <div class="col-md-6">
                <label for="passwordConfirm" class="form-label">Confirm Password</label>
                <input
                    id="passwordConfirm"
                    v-model="formData.password_confirmation"
                    name="password_confirmation"
                    type="password"
                    class="form-control"
                />
            </div>
            <div class="col-12">
                <button type="submit" class="btn btn-success text-white">Register</button>
            </div>
        </form>
    </div>
</template>
<script lang="ts">
    import { ActionTypes } from "@/store/modules/auth/action-types";
    import { useStore } from "@/use/useStore";
    import { handleActions } from "@/utils/helpers";
    import { defineComponent, ref } from "vue";
    import { useRouter } from "vue-router";

    export default defineComponent({
        setup() {
            // Store and router instances
            const store = useStore();
            const router = useRouter();
            // variables
            const formData = ref({
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                phoneNumber: ""
            });

            // ? REGISTER FUNCTION
            const register = async () => {
                const [, error] = await handleActions(
                    store.dispatch(ActionTypes.REGISTER, formData.value)
                );
                if (error) {
                    // TODO: handle errors
                    return;
                }
                router.push("/dashboard");
            };
            return {
                formData,
                register
            };
        }
    });
</script>
<style lang="scss"></style>
