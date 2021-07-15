<template>
    <div class="info">
        <div class="left">
            <label
                v-if="!showEditTask"
                class="custom-checkbox"
                tab-index="0"
                aria-label="Checkbox Label"
            >
                <input
                    type="checkbox"
                    name="test"
                    @change="toogleTaskCompleted()"
                    :checked="task.status === 'completed'"
                />
                <span class="checkmark"></span>
            </label>
            <h4
                @dblclick="!showEditTask ? toogleTaskForm() : null"
                :class="task.status === 'completed' ? 'task-completed' : ''"
            >
                <form @submit.prevent="updateTask()">
                    <input
                        type="text"
                        :disabled="!showEditTask"
                        v-model="newTaskTitle"
                        class="form-control bg-transparent border-0 p-2 outline-none"
                        placeholder="Title"
                    />
                </form>
            </h4>
        </div>
        <div class="right">
            <img
                :src="
                    !showEditTask
                        ? '../src/assets/images/edit.png'
                        : '../src/assets/images/check.png'
                "
                @click="toogleTaskForm()"
            />
            <img
                src="../../assets/images/del.png"
                @click="task.taskId ? deleteTask(task.taskId) : null"
            />
            <button :class="task.status">
                {{ task.status === "inprogress" ? "Inprogress" : "Completed" }}
            </button>
        </div>
    </div>
</template>

<script lang="ts">
    import { DailyTask } from "@/interfaces/Task";
    import { defineComponent, PropType, ref, watch } from "vue";
    import { useStore } from "@/use/useStore";
    import { ActionTypes } from "@/store/modules/daily_task/action-types";
    import Swal from "sweetalert2";
    export default defineComponent({
        name: "TodayTask",
        props: {
            task: {
                type: Object as PropType<DailyTask>,
                required: true
            }
        },
        setup(props) {
            // Intialize custom vuex-store
            const store = useStore();
            // variables
            const task = ref(props.task);
            let showEditTask = ref<boolean>(false);
            let newTaskTitle = ref<string>(task.value.title ?? "No title");
            /* TOGGLE TASK COMPLETED PROPERY */
            const toogleTaskCompleted = (): void => {
                const newTask: DailyTask = {
                    status: task.value.status === "completed" ? "inprogress" : "completed",
                    taskId: task.value.taskId!
                };
                //FIXME: الخط ما يظهر مباشرة بدون السطر اللي جوه اله اسوي ريفريش للمتصفح
                task.value.status = task.value.status === "completed" ? "inprogress" : "completed";
                store.dispatch(ActionTypes.EDIT_TASK, {
                    data: newTask,
                    taskId: task.value.taskId!
                });
            };
            // Edit task
            const toogleTaskForm = () => {
                showEditTask.value = !showEditTask.value;
            };
            const updateTask = async () => {
                if (!(task.value.title === newTaskTitle.value)) {
                    const newTask: DailyTask = {
                        title: newTaskTitle.value
                    };
                    store.dispatch(ActionTypes.EDIT_TASK, {
                        data: newTask,
                        taskId: task.value.taskId!
                    });
                    toogleTaskForm();
                } else {
                    Swal.fire({
                        icon: "warning",
                        toast: true,
                        showConfirmButton: false,
                        text: "DailyTask already exists!",
                        timer: 2000,
                        position: "top-end"
                    });
                }
            };
            /* DELETE TASK */
            const deleteTask = (taskId: string): void => {
                store.dispatch(ActionTypes.DELETE_TASK, taskId);
            };

            watch(task, (oldValue, newValue) => {
                console.log(oldValue);
                console.log(newValue);
            });

            return {
                toogleTaskCompleted,
                deleteTask,
                showEditTask,
                toogleTaskForm,
                newTaskTitle,
                updateTask
            };
        }
    });
</script>

<style lang="scss">
    .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5em 0.3em;
        border-radius: 0 0.3em 0.3em;

        &:hover {
            background-color: #70707010;
            transition: all 400ms ease-in-out;
        }

        .left {
            display: flex;
            flex-direction: row;
            align-items: center;
            label {
                cursor: pointer;
                margin-top: 0.3em;
                padding-top: 0.4em;

                input {
                    display: none;
                }

                span {
                    height: 20px;
                    width: 20px;
                    display: inline-block;
                    position: relative;
                    border-radius: 50px;
                    border: 2px solid var(--customgreen1);
                }
            }

            h4 {
                margin: 0;
                margin-left: 15px;
                font-family: "Open Sans", sans-serif;
                font-size: 13px;
                color: var(--primary2);
                font-weight: 600;
            }
        }

        .right {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            img {
                margin-right: 1em;
                cursor: pointer;
            }

            button {
                padding: 5px 31px;
                border-radius: 50px;
                border: unset;
                box-shadow: unset !important;
                width: 120px;
                font-family: "Open Sans", sans-serif;
                font-size: 12px;
                white-space: nowrap;
            }
        }
    }
</style>
