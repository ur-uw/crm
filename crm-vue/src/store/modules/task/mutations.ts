import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { Task } from "@/interfaces/Task";
import { TaskMutationsTypes, TaskStateTypes } from "@/store/store_interfaces/task_store_interface";
import { sortByUpdatedAt } from "@/utils/helpers";

export const mutations: MutationTree<TaskStateTypes> & TaskMutationsTypes = {
    [MutationTypes.SET_PROJECT_TASKS](state: TaskStateTypes, data: Task[]): void {
        state.tasks = data.sort((a, b) => b.status?.name?.length - a.status?.name?.length);
    },
    [MutationTypes.SET_TODAY_TASKS](state: TaskStateTypes, data: Task[]): void {
        state.todayTasks = data;
    },
    [MutationTypes.SET_RECENT_TASKS](state: TaskStateTypes, data: Task[]): void {
        state.recentTasks = data;
    },
    [MutationTypes.SET_LOADING](state: TaskStateTypes, value: boolean): void {
        state.isLoading = value;
    },
    [MutationTypes.SET_ITEM](
        state: TaskStateTypes,
        payload: { updatedTask: Task; index: number }
    ): void {
        if (state.tasks) {
            state.tasks[payload.index] = payload.updatedTask;
            state.tasks.sort(sortByUpdatedAt);
        }
    },
    [MutationTypes.DELETE_TASK](state: TaskStateTypes, id: number): void {
        state.tasks = state.tasks?.filter((task) => task.id !== id) ?? null;
    },
    [MutationTypes.ADD_ITEM](state: TaskStateTypes, task: Task): void {
        state.tasks?.unshift(task);
    },
    [MutationTypes.CHANGE_STATUS](
        state: TaskStateTypes,
        payload: { index: number; updatedTask: Task }
    ): void {
        if (state.tasks) {
            state.tasks[payload.index] = payload.updatedTask;
            state.tasks.sort(sortByUpdatedAt);
        }
    }
};
