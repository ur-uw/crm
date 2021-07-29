<template>
    <div id="body" class="">
        <div v-if="!isAuthLoading" class="row">
            <div
                class="
                    col-md-12 col-lg-4 col-sm-12
                    d-flex
                    justify-content-center
                    align-itmes-center
                "
            >
                <LeftBody />
            </div>
            <div class="col-md-12 col-lg-8 col-sm-12"><RightBody /></div>
        </div>
        <div v-else class="alert alert-info">Loading user......</div>
    </div>
</template>

<script>
    import LeftBody from "@/components/dashboard/LeftBody.vue";
    import RightBody from "./RightBody.vue";
    import { computed, defineComponent } from "vue";
    import { useStore } from "@/use/useStore";

    export default defineComponent({
        name: "Body",
        components: {
            LeftBody,
            RightBody
        },
        setup() {
            // store instance
            const store = useStore();
            // Variables
            const isAuthLoading = computed(() => store.getters.isAuthLoading);

            return {
                isAuthLoading
            };
        }
    });
</script>

<style lang="scss">
    #body {
        padding: 16px 16px 0 16px;
        font-family: "MyriadProSemiBold", sans-serif;
        min-height: 100vh;
        background-color: var(--bs-primary);
    }
</style>
