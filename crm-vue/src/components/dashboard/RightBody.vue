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
                <h2>Today's Task</h2>
                <div class="add-action">
                    <img src="../../assets/images/add.png" alt="add-action" />
                </div>
            </div>
            <TaskList />
        </div>
        <hr />

        <div class="upcoming">
            <div class="add-tasks">
                <h2>Upcoming</h2>
                <div class="add-action">
                    <img src="../../assets/images/add.png" alt="add-action" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref } from "vue";
    import TaskList from "@/components/dashboard/TasksList.vue";

    export default defineComponent({
        name: "RightBody",
        components: {
            TaskList
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
