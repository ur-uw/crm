import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { TaskMutationsTypes, TaskStateTypes } from "@/store/interfaces";
import { Task } from "@/interfaces/Task";

export const mutations: MutationTree<TaskStateTypes> & TaskMutationsTypes = {
    [MutationTypes.SET_ITEMS](state: TaskStateTypes, data: Task[]): void {
        state.tasks = data;
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
        }
    }
};
