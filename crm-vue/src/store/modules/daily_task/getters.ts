import { DailyTask } from '@/interfaces/Task';
import { GetterTree } from "vuex";
import {
  DailyTaskGettersTypes,
  DailyTaskStateTypes,
  IRootState
} from "@/store/interfaces";
export const getters: GetterTree<DailyTaskStateTypes, IRootState> &
  DailyTaskGettersTypes = {
  getAllDailyTasks(state: DailyTaskStateTypes): DailyTask[] {
    return state.tasks ?? [];
  },
  dailyTasksLoadingState(state: DailyTaskStateTypes): boolean {
    return state.isLoading;
  }
};
