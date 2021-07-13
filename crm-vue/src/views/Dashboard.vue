<template>
    <Body></Body>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import Body from "@/components/dashboard/Body.vue";
import { useStore } from "@/use/useStore";
import { ActionTypes } from "@/store/modules/daily_task/action-types";
export default defineComponent({
    name: "Dashboard",
    components: {
        Body
    },
    setup() {
        const store = useStore();
        onMounted(() => store.dispatch(ActionTypes.FETCH_TASKS));
    }
});
</script>
<style lang="scss"></style>
