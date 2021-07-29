<template>
    <Body></Body>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from "vue";
    import Body from "@/components/dashboard/Body.vue";
    import { useStore } from "@/use/useStore";
    import { ActionTypes as TaskATypes } from "@/store/modules/task/action-types";
    export default defineComponent({
        name: "Dashboard",
        components: {
            Body
        },
        setup() {
            const store = useStore();
            onMounted(() => {
                store.dispatch(TaskATypes.FETCH_RECENT_TASKS);
                store.dispatch(TaskATypes.FETCH_TASKS_FOR_DATE);
            });
        }
    });
</script>
<style lang="scss"></style>
