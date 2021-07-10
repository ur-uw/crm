<template>
    <Body></Body>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import Body from '@/components/dashboard/Body.vue';
import { useStore } from '@/store';
import { DailyTaskActionTypes } from '@/store/modules/daily_task_module/actions';
export default defineComponent({
    name: 'Dashboard',
    components: {
        Body,
    },
    setup() {
        const store = useStore();
        onMounted(() => store.dispatch(DailyTaskActionTypes.GetDailyTasks));
    },
});
</script>
<style lang="scss"></style>
