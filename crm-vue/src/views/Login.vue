<template>
    <form class="mt-5 form container" @submit.prevent="login()">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input
                type="email"
                name="email"
                v-model="email"
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
                v-model="password"
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

    export default defineComponent({
        setup() {
            const email = ref<string>("");
            const password = ref<string>("");
            // ? LOGIN FUNCTION
            const login = (): void => {
                console.log(`${email.value} ${password.value}`);
            };

            return {
                email,
                password,
                login
            };
        }
    });
</script>

<style lang="scss"></style>
