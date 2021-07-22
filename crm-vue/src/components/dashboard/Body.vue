<template>
    <div id="body" class="">
        <div class="row">
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
            <div class="col-md-12 col-lg-8 col-sm-12">
                <RightBody />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import LeftBody from "@/components/dashboard/LeftBody.vue";
    import RightBody from "./RightBody.vue";
    import { defineComponent, PropType, ref } from "vue";
    import { User } from "@/interfaces/User";
    export default defineComponent({
        name: "Body",
        props: {
            user: {
                type: Object as PropType<User>,
                required: true
            }
        },
        components: {
            LeftBody,
            RightBody
        }
    });
</script>

<style lang="scss">
    #body {
        padding: 16px;
        font-family: "MyriadProSemiBold", sans-serif;
        min-height: 100vh;
        background-color: var(--primary1);
    }
</style>
