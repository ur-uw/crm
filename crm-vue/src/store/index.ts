import { createLogger, createStore } from "vuex";
import { IRootState } from "@/store/interfaces";

import { RootStoreModuleTypes } from "./modules/root/types";

import root from "./modules/root";
import { DailyTaskStoreModuleTypes } from "./modules/daily_task/types";
import { UpcomingTaskStoreModuleTypes } from "./modules/upcoming_task/types";

export const store = createStore<IRootState>(
  {
    ...root,
    plugins: import.meta.env.DEV ? [createLogger()] : []
  }
);

type StoreModules = {
  dailyTaskModule: DailyTaskStoreModuleTypes,
  upcomingTaskModule: UpcomingTaskStoreModuleTypes,
  root: RootStoreModuleTypes;
};

export type Store = DailyTaskStoreModuleTypes<Pick<StoreModules, "dailyTaskModule">> &
  UpcomingTaskStoreModuleTypes<Pick<StoreModules, "upcomingTaskModule">> &
  RootStoreModuleTypes<Pick<StoreModules, "root">>;
