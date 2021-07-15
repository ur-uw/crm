import { UpcomingTask } from '@/interfaces/Task';
import { GetterTree } from "vuex";
import {
  UpcomingTaskGettersTypes,
  UpcomingTaskStateTypes,
  IRootState
} from "@/store/interfaces";
export const getters: GetterTree<UpcomingTaskStateTypes, IRootState> &
  UpcomingTaskGettersTypes = {
  getAllTasks(state: UpcomingTaskStateTypes): UpcomingTask[] {
    return state.tasks ?? [];
  },
  getLoadingState(state: UpcomingTaskStateTypes): boolean {
    return state.isLoading;
  }
};
