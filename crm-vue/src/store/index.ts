import { createLogger, createStore } from "vuex";
import { IRootState } from "@/store/register";

import { RootStoreModuleTypes } from "./modules/root/types";

import root from "./modules/root";
import { TaskStoreModuleTypes } from "./modules/task/types";
import { AuthStoreModuleTypes } from "./modules/auth/types";
import { ProjectStoreModuleTypes } from "./modules/project/types";
export const store = createStore<IRootState>({
    ...root,
    plugins: import.meta.env.DEV ? [createLogger()] : []
});

type StoreModules = {
    authModule: AuthStoreModuleTypes;
    projectModule: ProjectStoreModuleTypes;
    taskModule: TaskStoreModuleTypes;
    root: RootStoreModuleTypes;
};

export type Store = AuthStoreModuleTypes<Pick<StoreModules, "authModule">> &
    ProjectStoreModuleTypes<Pick<StoreModules, "projectModule">> &
    TaskStoreModuleTypes<Pick<StoreModules, "taskModule">> &
    RootStoreModuleTypes<Pick<StoreModules, "root">>;
