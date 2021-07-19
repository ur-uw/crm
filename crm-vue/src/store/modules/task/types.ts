import {
  TaskStateTypes,
  TaskMutationsTypes,
  TaskGettersTypes,
  TaskActionsTypes
} from "@/store/store_interfaces/task_store_interface";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type DailyTaskStoreModuleTypes<S = TaskStateTypes> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof TaskMutationsTypes,
    P extends Parameters<TaskMutationsTypes[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<TaskMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof TaskGettersTypes]: ReturnType<TaskGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof TaskActionsTypes>(
    key: K,
    payload?: Parameters<TaskActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<TaskActionsTypes[K]>;
};
