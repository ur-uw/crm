import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { DailyTaskMutationsTypes, DailyTaskStateTypes } from "@/store/interfaces";
import { DailyTask } from "@/interfaces/Task";

export const mutations: MutationTree<DailyTaskStateTypes> &
  DailyTaskMutationsTypes = {
  [MutationTypes.SET_DAILY_ITEMS](state: DailyTaskStateTypes, data: DailyTask[]): void {
    state.tasks = data;
  },
  [MutationTypes.SET_DAILY_LOADING](state: DailyTaskStateTypes, value: boolean): void {
    state.isLoading = value;
  },
  [MutationTypes.SET_DAILY_ITEM](state: DailyTaskStateTypes, newTask: { data: DailyTask, taskId: string }): void {
    let task: DailyTask = state.tasks?.find((t) => t.taskId === newTask.taskId)!;
    task = newTask.data;
  },
  [MutationTypes.DELETE_DAILY_TASK](state: DailyTaskStateTypes, taskId: string): void {
    state.tasks = state.tasks?.filter((task) => task.taskId !== taskId) ?? null;
  },
  [MutationTypes.ADD_DAILY_ITEM](state: DailyTaskStateTypes, task: DailyTask): void {
    state.tasks?.unshift(task);
  },

};
