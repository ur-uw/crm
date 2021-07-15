import { DailyTask } from './../../../interfaces/DailyTask';
import { GetterTree } from "vuex";
import {
  DailyTaskGettersTypes,
  DailyTaskStateTypes,
  IRootState
} from "@/store/interfaces";
export const getters: GetterTree<DailyTaskStateTypes, IRootState> &
  DailyTaskGettersTypes = {
  getAllTasks(state: DailyTaskStateTypes): DailyTask[] {
    return state.tasks ?? [];
  },
  getLoadingState(state: DailyTaskStateTypes): boolean {
    return state.isLoading;
  }
};
