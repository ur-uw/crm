<template>
    <div v-if="isLoading" class="mt-1">
        <div class="alert alert-info">Loading....</div>
    </div>
    <div v-else>
        <ul v-if="dailyTasks.length > 0" class="tasks-list">
            <li v-for="task in dailyTasks" v-bind:key="task.id">
                <UpcomingTask :task="task" />
            </li>
        </ul>
        <div v-else class="p-3 text-center text-custom-dark-blue bg-light mt-2">
            <h6>No Tasks Today <strong>😴</strong></h6>
        </div>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent } from "vue";
    import { useStore } from "@/use/useStore";
    import UpcomingTask from "./UpcomingTask.vue";
    export default defineComponent({
        components: {
            UpcomingTask
        },
        setup() {
            const store = useStore();
            // VARIABLES
            const dailyTasks = computed(() => store.getters.getAllTasks);
            const isLoading = computed(() => store.getters.getLoadingState);
            // Methods

            return { dailyTasks, isLoading };
        }
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
