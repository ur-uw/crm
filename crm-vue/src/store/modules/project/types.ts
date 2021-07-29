import {
    ProjectStateTypes,
    ProjectMutationsTypes,
    ProjectGettersTypes,
    ProjectActionsTypes
} from "@/store/store_interfaces/project_store_interface";
import { Store as VuexStore, CommitOptions, DispatchOptions } from "vuex";

export type ProjectStoreModuleTypes<S = ProjectStateTypes> = Omit<
    VuexStore<S>,
    "commit" | "getters" | "dispatch"
> & {
    commit<
        K extends keyof ProjectMutationsTypes,
        P extends Parameters<ProjectMutationsTypes[K]>[1]
    >(
        key: K,
        payload?: P,
        options?: CommitOptions
    ): ReturnType<ProjectMutationsTypes[K]>;
} & {
    getters: {
        [K in keyof ProjectGettersTypes]: ReturnType<ProjectGettersTypes[K]>;
    };
} & {
    dispatch<K extends keyof ProjectActionsTypes>(
        key: K,
        payload?: Parameters<ProjectActionsTypes[K]>[1],
        options?: DispatchOptions
    ): ReturnType<ProjectActionsTypes[K]>;
};
