import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { UpcomingTaskMutationsTypes, UpcomingTaskStateTypes } from "@/store/interfaces";
import { UpcomingTask } from "@/interfaces/Task";
/*
  [DailyTaskMTypes.ADD_TASK](state: S, data: DailyTask): void;
  [DailyTaskMTypes.SET_ITEM](state: S, data: { newData: DailyTask, taskId: string }): void;
  [DailyTaskMTypes.SET_LOADING](state: S, value: boolean): void;
  [DailyTaskMTypes.DELETE_TASK](state: S, taskId: string): void;
*/
export const mutations: MutationTree<UpcomingTaskStateTypes> &
  UpcomingTaskMutationsTypes = {
  [MutationTypes.SET_ITEMS](state: UpcomingTaskStateTypes, data: UpcomingTask[]): void {
    state.tasks = data;
  },
  [MutationTypes.SET_LOADING](state: UpcomingTaskStateTypes, value: boolean): void {
    state.isLoading = value;
  },
  [MutationTypes.SET_ITEM](state: UpcomingTaskStateTypes, newTask: { data: UpcomingTask, taskId: string }): void {
    let task: UpcomingTask = state.tasks?.find((t) => t.taskId === newTask.taskId)!;
    task = newTask.data;
  },
  [MutationTypes.DELETE_TASK](state: UpcomingTaskStateTypes, taskId: string): void {
    state.tasks = state.tasks?.filter((task) => task.taskId !== taskId) ?? null;
  },
  [MutationTypes.ADD_TASK](state: UpcomingTaskStateTypes, task: UpcomingTask): void {
    state.tasks?.unshift(task);
  },

};
