<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Mangee</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="dashboard">Dashboard</router-link>
                    </li>
                </ul>
                <div v-if="!isUserLoggedIn" class="navbar-nav text-white">
                    <div class="nav-item">
                        <router-link class="nav-link" to="login">Login</router-link>
                    </div>
                    <div class="nav-item">
                        <router-link class="btn btn-outline-success" to="register">
                            Register
                        </router-link>
                    </div>
                </div>
                <div v-else class="navbar-nav text-white">
                    <div class="nav-item">
                        <button class="btn btn-custom-purple">Sign out</button>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>
<script lang="ts">
    import { computed, defineComponent } from "vue";
    import { useStore } from "@/use/useStore";
    export default defineComponent({
        setup() {
            const store = useStore();
            const isUserLoggedIn = computed(() => store.getters.isUserLoggedIn);
            return {
                isUserLoggedIn
            };
        }
    });
</script>
