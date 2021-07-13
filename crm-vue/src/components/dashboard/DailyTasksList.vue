<template>
    <div v-if="isLoading">
        <div class="alert alert-info">Loading....</div>
    </div>
    <div v-else>
        <ul v-if="dailyTasks.length > 0" class="tasks-list">
            <li v-for="task in dailyTasks" v-bind:key="task.id">
                <TodayTask :task="task" />
            </li>
        </ul>
        <div v-else class="p-3 text-center text-custom-dark-blue bg-light">
            <h6>No Tasks Today <strong>😴</strong></h6>
        </div>
    </div>
</template>

<script lang="ts">
import { DailyTask } from "@/interfaces/Task";
import { computed, defineComponent } from "vue";
import { useStore } from "@/use/useStore";
import TodayTask from "./TodayTask.vue";
export default defineComponent({
    components: {
        TodayTask,
    },
    setup() {
        const store = useStore();
        const isLoading = computed(() => store.getters.getLoadingState);
        const dailyTasks = computed(() => store.getters.getAllTasks);
        return { dailyTasks, isLoading };
    },
});
</script>

<style lang="scss" scoped>
ul.tasks-list {
    margin-top: 15px;

    li {
        display: flex;
        flex-direction: column;
    }
}
</style>
