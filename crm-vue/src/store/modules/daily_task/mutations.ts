import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { DailyTaskMutationsTypes, DailyTaskStateTypes } from "@/store/interfaces";
import { DailyTask } from "@/interfaces/Task";
/*
  [DailyTaskMTypes.ADD_TASK](state: S, data: DailyTask): void;
  [DailyTaskMTypes.COMPLETE_TASK](state: S, data: { newData: DailyTask, taskId: string }): void;
  [DailyTaskMTypes.SET_LOADING](state: S, value: boolean): void;
  [DailyTaskMTypes.DELETE_TASK](state: S, taskId: string): void;
*/
export const mutations: MutationTree<DailyTaskStateTypes> &
  DailyTaskMutationsTypes = {
  [MutationTypes.SET_ITEMS](state: DailyTaskStateTypes, data: DailyTask[]): void {
    state.tasks = data;
  },
  [MutationTypes.SET_LOADING](state: DailyTaskStateTypes, value: boolean): void {
    state.isLoading = value;
  },
  [MutationTypes.COMPLETE_TASK](state: DailyTaskStateTypes, data: {
    newData: DailyTask, taskId: string
  }): void {
    // TODO: IMPLEMENT COMPLETE TASK
    console.log('complete task - mutation');
  },
  [MutationTypes.DELETE_TASK](state: DailyTaskStateTypes, taskId: string): void {
    state.tasks = state.tasks?.filter((task) => task.taskId !== taskId) ?? null;
  },
  [MutationTypes.ADD_TASK](state: DailyTaskStateTypes, task: DailyTask): void {
    state.tasks?.unshift(task);
  },

};
