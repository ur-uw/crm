<template>
    <form @submit.prevent="addDailyTask()">
        <input
            class="form-control form-control-lg bg-primary2 text-white"
            type="text"
            placeholder="New task"
            v-model="newTaskTitle"
        />
    </form>
    <div v-if="isLoading" class="mt-1">
        <div class="alert alert-info">Loading....</div>
    </div>
    <div v-else>
        <ul v-if="tasks.length > 0" class="tasks-list">
            <li v-for="(task, index) in tasks" v-bind:index="index" v-bind:key="task.id">
                <TodayTask :task="task" />
            </li>
        </ul>
        <div v-else class="p-3 text-center text-custom-dark-blue bg-light mt-2">
            <h6>No Tasks Today <strong>😴</strong></h6>
        </div>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, ref } from "vue";
    import { useStore } from "@/use/useStore";
    import TodayTask from "./Task.vue";
    import { ActionTypes } from "@/store/modules/task/action-types";
    import { Task } from "@/interfaces/Task";
    import Swal from "sweetalert2";
    export default defineComponent({
        components: {
            TodayTask
        },
        setup() {
            const store = useStore();
            // VARIABLES
            const newTaskTitle = ref<string>("");
            const tasks = computed(() => store.getters.getAllTasks);
            const isLoading = computed(() => store.getters.tasksLoadingState);
            // Methods
            const addDailyTask = () => {
                const task = tasks.value.find((t) => t.title === newTaskTitle.value) ?? null;
                if (!task) {
                    const newTask: Task = {
                        title: newTaskTitle.value,
                        status_id: 1,
                        status: {
                            id: 1,
                            name: "Waiting",
                            slug: "waiting"
                        },
                        slug: newTaskTitle.value.toLowerCase().replaceAll(" ", "-")
                    };

                    store.dispatch(ActionTypes.CREATE_TASK, newTask);
                    newTaskTitle.value = "";
                } else {
                    console.log("Task exists");
                    Swal.fire({
                        icon: "warning",
                        toast: true,
                        showConfirmButton: false,
                        text: "Task already exists!",
                        timer: 2000,
                        position: "top-end"
                    });
                }
            };
            return { tasks, isLoading, newTaskTitle, addDailyTask };
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
