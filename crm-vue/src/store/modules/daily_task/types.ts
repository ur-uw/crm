import {
  DailyTaskStateTypes,
  DailyTaskMutationsTypes,
  DailyTaskGettersTypes,
  DailyTaskActionsTypes
} from "@/store/interfaces";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type DailyTaskStoreModuleTypes<S = DailyTaskStateTypes> = Omit<
  VuexStore<S>,
  "commit" | "getters" | "dispatch"
> & {
  commit<
    K extends keyof DailyTaskMutationsTypes,
    P extends Parameters<DailyTaskMutationsTypes[K]>[1]
  >(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<DailyTaskMutationsTypes[K]>;
} & {
  getters: {
    [K in keyof DailyTaskGettersTypes]: ReturnType<DailyTaskGettersTypes[K]>;
  };
} & {
  dispatch<K extends keyof DailyTaskActionsTypes>(
    key: K,
    payload?: Parameters<DailyTaskActionsTypes[K]>[1],
    options?: DispatchOptions
  ): ReturnType<DailyTaskActionsTypes[K]>;
};
