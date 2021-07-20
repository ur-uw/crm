<template>
    <form class="mt-5 form container" @submit.prevent="login()">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input
                type="email"
                name="email"
                v-model="formData.email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
            />
            <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
            </div>
        </div>
        <div class="mb-3">
            <label for="inputPassword5" class="form-label">Password</label>
            <input
                type="password"
                name="password"
                v-model="formData.password"
                id="inputPassword5"
                class="form-control"
                aria-describedby="passwordHelpBlock"
            />
            <div id="passwordHelpBlock" class="form-text">
                Your password must be 8-20 characters long, contain letters and numbers, and must
                not contain spaces, special characters, or emoji.
            </div>
        </div>

        <button type="submit" class="btn btn-primary">Login</button>
    </form>
</template>
<script lang="ts">
    import { ref, defineComponent } from "vue";
    import { useStore } from "@/use/useStore";
    import { ActionTypes } from "@/store/modules/auth/action-types";

    export default defineComponent({
        setup() {
            // create store instance
            const store = useStore();
            const formData = ref({
                email: "",
                password: ""
            });

            // ? LOGIN FUNCTION
            const login = (): void => {
                store.dispatch(ActionTypes.LOGIN, formData.value);
            };

            return {
                formData,
                login
            };
        }
    });
</script>

<style lang="scss"></style>
