import {
  UpcomingTaskStateTypes,
  UpcomingTaskMutationsTypes,
  UpcomingTaskGettersTypes,
  UpcomingTaskActionsTypes
} from "@/store/interfaces";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type UpcomingTaskStoreModuleTypes<S = UpcomingTaskStateTypes> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof UpcomingTaskMutationsTypes,
    P extends Parameters<UpcomingTaskMutationsTypes[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<UpcomingTaskMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof UpcomingTaskGettersTypes]: ReturnType<UpcomingTaskGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof UpcomingTaskActionsTypes>(
    key: K,
    payload?: Parameters<UpcomingTaskActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<UpcomingTaskActionsTypes[K]>;
};
