<template>
    <div id="right" class="p-5">
        <h1>Development Crm</h1>
        <div class="horizontal">
            <img src="../../assets/images/horizontal.png" alt="horizontal" />
        </div>
        <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
            has been the industry's standard dummy text ever since the 1500s
        </p>

        <div class="users-icon">
            <img src="../../assets/images/users.png" alt="users" />
        </div>

        <div class="tasks">
            <div class="add-tasks">
                <h2>Today's DailyTask</h2>
                <div class="add-action">
                    <img src="../../assets/images/add.png" alt="add-action" />
                </div>
            </div>

            <DailyTasksList />
        </div>

        <div class="upcoming">
            <div class="add-tasks">
                <h2>Upcoming</h2>
                <div class="add-action">
                    <img src="../../assets/images/add.png" alt="add-action" />
                </div>
            </div>
            <form action="" @submit="addUpcomingTask">
                <input
                    class="form-control form-control-lg bg-primary2 text-white"
                    type="text"
                    placeholder="Enter new task"
                    v-model="newTaskTitle"
                />
            </form>
            <ul v-if="upcoming.length > 0" class="tasks-list">
                <li v-for="upcomingTask in upcoming" :key="upcomingTask.id">
                    <div class="info">
                        <div class="left">
                            <label
                                class="custom-checkbox"
                                tab-index="0"
                                aria-label="Checkbox Label"
                            >
                                <input
                                    type="checkbox"
                                    name="test"
                                    :checked="upcomingTask.status === 'completed'"
                                    @change="checkUpcoming(upcomingTask.taskId)"
                                />
                                <span class="checkmark"></span>
                            </label>
                            <h4>
                                {{ upcomingTask.title }}
                            </h4>
                        </div>
                        <div class="right">
                            <img src="../../assets/images/edit.png" alt="edit" />
                            <img
                                src="../../assets/images/del.png"
                                @click="deleteUpcoming(upcomingTask.taskId)"
                                alt="del"
                            />

                            <button
                                v-bind:class="{
                                    inprogress: upcomingTask.status === 'inprogress',
                                    approved: upcomingTask.status === 'approved',
                                    completed: upcomingTask.status === 'completed',
                                    waiting: upcomingTask.status === 'waiting',
                                    rejected: upcomingTask.status === 'denied'
                                }"
                            >
                                {{ upcomingTask.status }}
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
            <div v-else class="p-3 text-center text-custom-dark-blue bg-light mt-3">
                <h6>No Upcoming Tasks Yet<strong>😴</strong></h6>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import axios from "axios";
    import { defineComponent, ref } from "vue";
    import { DailyTask, UpComingTask } from "@/interfaces/Task";
    import DailyTasksList from "@/components/dashboard/DailyTasksList.vue";

    export default defineComponent({
        name: "RightBody",
        components: {
            DailyTasksList
        },
        // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
        setup() {
            const todayTasks = ref<DailyTask[]>([]);
            const upcoming = ref<UpComingTask[]>([]);
            const newTaskTitle = ref<string>("");

            //** Upcoming DailyTask **//
            function fetchUpcoming(): void {
                axios.get("/api/upcoming").then(({ data }) => {
                    upcoming.value = data["data"];
                });
            }

            //** Today DailyTask **//
            function fetchTodayTasks(): void {
                axios.get("/api/dailytask").then(({ data }) => (todayTasks.value = data["data"]));
            }

            //** Add Upcoming DailyTask **//
            function addUpcomingTask(e: Event): void {
                e.preventDefault();
                if (upcoming.value.length > 4) {
                    alert("Please complete the upcoming tasks");
                } else {
                    const newTask = {
                        title: newTaskTitle.value,
                        waiting: true,
                        taskId: Math.random().toString(36).substring(7)
                    } as UpComingTask;

                    //post request
                    axios
                        .post("/api/upcoming", newTask)
                        .then(() => upcoming.value.push(newTask))
                        .catch((e) => console.log(e));

                    //Clear or Reset newTask
                    newTaskTitle.value = "";
                }
            }

            //** Delete Upcoming DailyTask **//
            function deleteUpcoming(taskId: string | undefined): void {
                if (confirm("Are you sure?")) {
                    //delete request
                    axios
                        .delete(`/api/upcoming/${taskId}`, {})
                        .then(() => {
                            upcoming.value = upcoming.value.filter(
                                (task: UpComingTask) => task.taskId != taskId
                            );
                        })
                        .catch((e) => console.error(e));
                }
            }

            // Check upcoming task
            function checkUpcoming(taskId: string | undefined): void {
                if (todayTasks.value.length > 4) {
                    alert("Please complete existing tasks!");
                } else {
                    addDailyTask(taskId);
                    //Delete this task from db
                    axios
                        .delete(`/api/upcoming/${taskId}`)
                        .then(() => {
                            upcoming.value = upcoming.value.filter(
                                (task: UpComingTask) => task.taskId != taskId
                            );
                        })
                        .catch((e) => console.warn(e.message));
                }
            }

            //** Add daily task and remove upcoming from database **//
            function addDailyTask(taskId: string | undefined): void {
                const task = upcoming.value.filter(
                    (task: UpComingTask) => task.taskId == taskId
                )[0] as DailyTask;
                //POST REQUEST
                axios
                    .post("/api/dailytask", task)
                    .then(() => {
                        todayTasks.value.unshift(task);
                    })
                    .catch((e) => console.error(e));
            }

            //Update today task
            function checkTodayTask(taskId: string): void {
                if (confirm("DailyTask Completed?")) {
                    axios
                        .delete(`/api/dailytask/${taskId}`)
                        .then(() => {
                            todayTasks.value = todayTasks.value.filter(
                                (task: DailyTask) => task.taskId != taskId
                            );
                        })
                        .catch((e) => console.error(e));
                }
            }

            // Delte today task
            function deleteTodayTask(taskId: string): void {
                if (confirm("Are you sure")) {
                    //Delete this task from db
                    axios.delete(`/api/dailytask/${taskId}`).then(() => {
                        todayTasks.value = todayTasks.value.filter(
                            (task: DailyTask) => task.taskId != taskId
                        );
                    });
                }
            }

            //Calling functions
            fetchUpcoming();
            fetchTodayTasks();
            return {
                upcoming,
                todayTasks,
                newTaskTitle,
                addUpcomingTask,
                deleteUpcoming,
                checkUpcoming,
                checkTodayTask,
                deleteTodayTask
            };
        }
    });
</script>
<style scoped lang="scss">
    #right {
        position: relative;
        grid-area: Right;
        background-color: #fff;
        border-radius: 15px;
        min-height: 100vh;

        h1 {
            font-family: "MyriadProBold", sans-serif;
            font-size: 24px;
            font-weight: 400;
            margin-bottom: 10px;
        }

        .horizontal {
            img {
                width: 122px;
            }

            margin-bottom: 10px;
        }

        p {
            font-family: "Open Sans", sans-serif;
            font-size: 12px;
            font-weight: 300;
            width: 500px;
        }

        .users-icon {
            position: absolute;
            right: 42px;
            top: 65px;
            cursor: pointer;

            img {
                height: 30px;
            }
        }

        .tasks,
        .upcoming {
            margin-bottom: 1.3em;

            .add-tasks {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;

                h2 {
                    font-family: "MyriadProBold", sans-serif;
                    font-size: 15px;
                    font-weight: 400;
                }

                img {
                    cursor: pointer;
                }
            }

            input[type="text"] {
                border: unset;
                border-bottom: 1px solid var(--customgrey);
                width: 100%;
                caret-color: var(--primary1);
            }

            ul.tasks-list {
                margin-top: 15px;

                li {
                    display: flex;
                    flex-direction: column;
                }
            }
        }
    }
</style>
