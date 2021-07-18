import { Task } from '@/interfaces/Task';
import { GetterTree } from "vuex";
import {
  TaskGettersTypes,
  TaskStateTypes,
  IRootState
} from "@/store/interfaces";
export const getters: GetterTree<TaskStateTypes, IRootState> &
  TaskGettersTypes = {
  getAllTasks(state: TaskStateTypes): Task[] {
    return state.tasks ?? [];
  },
  tasksLoadingState(state: TaskStateTypes): boolean {
    return state.isLoading;
  }
};
