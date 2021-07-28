import { Task } from "@/interfaces/Task";
import { GetterTree } from "vuex";
import { IRootState } from "@/store/register";
import { TaskGettersTypes, TaskStateTypes } from "@/store/store_interfaces/task_store_interface";
export const getters: GetterTree<TaskStateTypes, IRootState> & TaskGettersTypes = {
    getAllTasks(state: TaskStateTypes): Task[] {
        return state.tasks ?? [];
    },
    tasksLoadingState(state: TaskStateTypes): boolean {
        return state.isLoading;
    }
};
