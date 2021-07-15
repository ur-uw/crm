<template>
    <Body></Body>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from "vue";
    import Body from "@/components/dashboard/Body.vue";
    import { useStore } from "@/use/useStore";
    import { ActionTypes as DailyTaskATypes } from "@/store/modules/daily_task/action-types";
    import { ActionTypes as UpcomingTaskATypes } from "@/store/modules/upcoming_task/action-types";
    export default defineComponent({
        name: "Dashboard",
        components: {
            Body
        },
        setup() {
            const store = useStore();
            onMounted(() => {
                store.dispatch(DailyTaskATypes.FETCH_DAILY_TASKS);
                store.dispatch(UpcomingTaskATypes.FETCH_UPCOMING_TASKS);
            });
        }
    });
</script>
<style lang="scss"></style>
