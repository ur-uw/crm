<template>
    <div class="container mt-5">
        <form class="row g-3" @submit.prevent="register()">
            <div class="col-6">
                <label for="fullName" class="form-label">Name</label>
                <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    id="fullName"
                    name="name"
                    placeholder="John Doe"
                />
            </div>
            <div class="col-6">
                <label for="phoneNumber" class="form-label">Phone</label>
                <input
                    v-model="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    class="form-control"
                    id="phoneNumber"
                    placeholder="+1343-434-4444"
                />
            </div>
            <div class="col-md-12">
                <label for="inputEmail4" class="form-label">Email</label>
                <input
                    name="email"
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                />
            </div>
            <div class="col-md-6">
                <label for="inputPassword4" class="form-label">Password</label>
                <input
                    name="password"
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="inputPassword4"
                />
            </div>
            <div class="col-md-6">
                <label for="passwordConfirm" class="form-label">Confirm Password</label>
                <input
                    name="password-confirm"
                    v-model="passwordConfirm"
                    type="password"
                    class="form-control"
                    id="passwordConfirm"
                />
            </div>
            <div class="col-12">
                <label for="inputAddress" class="form-label">Address</label>
                <input
                    v-model="address1"
                    name="address1"
                    type="text"
                    class="form-control"
                    id="inputAddress"
                    placeholder="1234 Main St"
                />
            </div>
            <div class="col-12">
                <label for="inputAddress2" class="form-label">Address 2</label>
                <input
                    v-model="address2"
                    name="address2"
                    type="text"
                    class="form-control"
                    id="inputAddress2"
                    placeholder="Apartment, studio, or floor"
                />
            </div>
            <div class="col-md-6">
                <label for="inputCity" class="form-label">City</label>
                <input name="city" v-model="city" type="text" class="form-control" id="inputCity" />
            </div>
            <div class="col-md-4">
                <label for="inputState" class="form-label">State</label>
                <select name="state" v-model="state" id="inputState" class="form-select">
                    <option selected>Choose...</option>
                    <option>...</option>
                </select>
            </div>
            <div class="col-md-2">
                <label for="inputZip" class="form-label">Zip</label>
                <input name="zip" v-model="zip" type="text" class="form-control" id="inputZip" />
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
            const name = ref<string>("");
            const email = ref<string>("");
            const password = ref<string>("");
            const passwordConfirm = ref<string>("");
            const city = ref<string>("");
            const state = ref<string>("");
            const address1 = ref<string>("");
            const address2 = ref<string>("");
            const zip = ref<number>();
            const phoneNumber = ref<string>("");
            // ? REGISTER FUNCTION
            const register = (): void => {
                console.log(
                    `   
                    ${name.value}
                    ${email.value}

                    ${password.value}

                    ${city.value} 

                    ${state.value}

                `
                );
            };
            return {
                name,
                email,
                password,
                passwordConfirm,
                city,
                state,
                address1,
                address2,
                zip,
                phoneNumber,
                register
            };
        }
    });
</script>
<style lang="scss"></style>
