import { createLogger, createStore } from "vuex";
import { IRootState } from "@/store/register";

import { RootStoreModuleTypes } from "./modules/root/types";

import root from "./modules/root";
import { DailyTaskStoreModuleTypes } from "./modules/task/types";

export const store = createStore<IRootState>(
  {
    ...root,
    plugins: import.meta.env.DEV ? [createLogger()] : []
  }
);

type StoreModules = {
  dailyTaskModule: DailyTaskStoreModuleTypes,
  root: RootStoreModuleTypes;
};

export type Store = DailyTaskStoreModuleTypes<Pick<StoreModules, "dailyTaskModule">> &
  RootStoreModuleTypes<Pick<StoreModules, "root">>;
