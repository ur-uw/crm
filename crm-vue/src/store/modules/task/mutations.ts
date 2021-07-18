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
    [MutationTypes.SET_ITEM](state: TaskStateTypes, updatedTask: Task): void {
        let task: Task = state.tasks?.find((t) => t.id === updatedTask.id)!;
        task = updatedTask;
    },
    [MutationTypes.DELETE_TASK](state: TaskStateTypes, id: number): void {
        state.tasks = state.tasks?.filter((task) => task.id !== id) ?? null;
    },
    [MutationTypes.ADD_ITEM](state: TaskStateTypes, task: Task): void {
        state.tasks?.unshift(task);
    },
    [MutationTypes.CHANGE_STATUS](
        state: TaskStateTypes,
        payload: { id: number; status_slug: string }
    ): void {
        // TODO: implement change status in mutations
    }
};
