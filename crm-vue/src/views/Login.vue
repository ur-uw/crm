<template>
    <div class="container">
        <div class="row align-items-center">
            <div class="col-md-6">
                <form @submit.prevent="login()">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email Address</label>
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
                            Your password must be 8-20 characters long, contain letters and numbers,
                            and must not contain spaces, special characters, or emoji.
                        </div>
                    </div>
                    <p class="text-danger" v-for="(error, index) in authErrors" :key="index">
                        {{ error[0] }}
                    </p>
                    <button type="submit" class="btn btn-success text-white">Login</button>
                </form>
            </div>
            <div class="col-md-6 align-items-center">
                <img
                    class="h-100 w-100"
                    src="../assets/images/undraw_product_iteration_kjok.svg"
                    alt="work"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import { ref, defineComponent } from "vue";
    import { useStore } from "@/use/useStore";
    import { ActionTypes } from "@/store/modules/auth/action-types";
    import { handleActions } from "@/utils/helpers";
    import { useRouter } from "vue-router";

    export default defineComponent({
        setup() {
            // create store instance
            const store = useStore();
            // create router instance
            const router = useRouter();
            // variables
            const formData = ref({
                email: "",
                password: ""
            });
            const authErrors = ref();
            // ? LOGIN FUNCTION
            const login = async () => {
                const [data, error] = await handleActions(
                    store.dispatch(ActionTypes.LOGIN, formData.value)
                );
                if (error) {
                    authErrors.value = error.response.data.errors;
                    return;
                }
                router.push("/dashboard");
            };

            return {
                formData,
                login,
                authErrors
            };
        }
    });
</script>

<style lang="scss"></style>
