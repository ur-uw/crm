<template>
    <div class="info">
        <div class="left">
            <label class="custom-checkbox" tab-index="0" aria-label="Checkbox Label">
                <input
                    type="checkbox"
                    name="test"
                    @change="toogleTaskCompleted(task)"
                    :checked="task.completed"
                />
                <span class="checkmark"></span>
            </label>

            <h4 :class="task.completed ? 'completed' : ''">
                {{ task.title }}
            </h4>
        </div>
        <div class="right">
            <img src="../../assets/images/edit.png" />
            <img
                src="../../assets/images/del.png"
                @click="task.taskId ? deleteTask(task.taskId) : null"
            />
            <button
                v-if="!task.completed"
                :class="{
                    inprogress: !task.approved,
                    approved: task.approved
                }"
            >
                {{ task.approved ? "Approved" : "In progress" }}
            </button>
            <button v-else class="bg-success text-white">completed</button>
        </div>
    </div>
</template>

<script lang="ts">
import { DailyTask } from "@/interfaces/Task";
import { defineComponent, PropType } from "vue";
import { useStore } from "@/use/useStore";
import { ActionTypes } from "@/store/modules/daily_task/action-types";
export default defineComponent({
    name: "TodayTask",
    props: {
        task: {
            type: Object as PropType<DailyTask>,
            required: true
        }
    },
    setup() {
        const store = useStore();
        /* TOGGLE TASK COMPLETED PROPERY */
        const toogleTaskCompleted = (task: DailyTask): void => {
            if (task.taskId) {
                const data = {
                    newTaskData: { completed: !task.completed },
                    taskId: task.taskId
                };
                store.dispatch(ActionTypes.EDIT_TASK, data);
            }
        };
        /* DELETE TASK */
        const deleteTask = (taskId: string): void => {
            store.dispatch(ActionTypes.DELETE_TASK, taskId);
        };
        return {
            toogleTaskCompleted,
            deleteTask
        };
    }
});
</script>

<style lang="scss">
.info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
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
