import { DailyTask } from "@/interfaces/Task";
import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  dailyTasks(state: State): DailyTask[];
  dailyTasksLength(state: State): number;
  completedDailyTasks(state: State): DailyTask[];
};

export const getters: GetterTree<State, State> & Getters = {
  dailyTasks(state) {
    return state.items;
  },
  dailyTasksLength(state) {
    return state.items.length;
  },

  completedDailyTasks(state) {
    return state.items.filter((item) => item.completed);
  },

  // completedCount(state) {
  //   return state.items.filter((i) => i.completed).length;
  // },
  // totalCount(state) {
  //   return state.items.length;
  // },
};
