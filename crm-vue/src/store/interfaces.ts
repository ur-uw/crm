import { ActionContext, DispatchOptions } from "vuex";
/******************* [TASK]*********************/
import { MutationTypes as TaskMTypes } from "./modules/task/mutation-types";
import { ActionTypes as TaskATypes } from "./modules/task/action-types";
/******************* [ROOT] *********************/
import { MutationTypes as RootMTypes } from "./modules/root/mutation-types";
import { ActionTypes as RootATypes } from "./modules/root/action-types";
/******************* (DATA MODELS) *********************/
import { Task } from "@/interfaces/Task";

export interface IUserData {
    id: number;
    userId: number;
    title: string;
    body: string;
}
export interface IRootState {
    root: boolean;
    version: string;
    userlists: any[];
}

export interface IMergedState extends IRootState {
    dailyTaskModule: TaskStateTypes;
}

export interface IRootGettersTypes {
    getVersion(state: IRootState): string;
    getUserList(state: IRootState): IUserData[];
}

export type RootMutationsTypes<S = IRootState> = {
    [RootMTypes.UPDATE_VERSION](state: S, payload: string): void;
    [RootMTypes.USER_LISTS](state: S, payload: IUserData[]): void;
};

/**
 * probably this can be moved inside individual module
 * as counterTypes.ts and then can be imported here
 */
type AugmentedActionContextRoot = {
    commit<K extends keyof RootMutationsTypes>(
        key: K,
        payload: Parameters<RootMutationsTypes[K]>[1]
    ): ReturnType<RootMutationsTypes[K]>;
} & Omit<ActionContext<IRootState, IRootState>, "commit"> & {
        dispatch<K extends keyof StoreActions>(
            key: K,
            payload?: Parameters<StoreActions[K]>[1],
            options?: DispatchOptions
        ): ReturnType<StoreActions[K]>;
    };

export interface RootActionsTypes {
    [RootATypes.UPDATE_VERSION]({ commit }: AugmentedActionContextRoot, payload: string): void;
    [RootATypes.COUNTER_CHECK]({ dispatch }: AugmentedActionContextRoot, payload: boolean): void;
    [RootATypes.USER_LISTS]({ dispatch }: AugmentedActionContextRoot, payload: IUserData[]): void;
}

/*********************** TASK MODULE TYPES  ***********************/
export interface TaskStateTypes {
    tasks: Task[] | null;
    isLoading: boolean;
}

export interface TaskGettersTypes {
    getAllTasks(state: TaskStateTypes): Task[];
    tasksLoadingState(state: TaskStateTypes): boolean;
}

export type TaskMutationsTypes<S = TaskStateTypes> = {
    [TaskMTypes.SET_ITEMS](state: S, data: Task[]): void;
    [TaskMTypes.ADD_ITEM](state: S, data: Task): void;
    [TaskMTypes.SET_ITEM](state: S, payload: { index: number; updatedTask: Task }): void;
    [TaskMTypes.SET_LOADING](state: S, value: boolean): void;
    [TaskMTypes.CHANGE_STATUS](state: S, payload: { index: number; updatedTask: Task }): void;
    [TaskMTypes.DELETE_TASK](state: S, id: number): void;
};

export type AugmentedActionContextTask = {
    commit<K extends keyof TaskMutationsTypes>(
        key: K,
        payload: Parameters<TaskMutationsTypes[K]>[1]
    ): ReturnType<TaskMutationsTypes[K]>;
} & Omit<ActionContext<TaskStateTypes, IRootState>, "commit">;

export interface TaskActionsTypes {
    [TaskATypes.FETCH_TASKS]({ commit }: AugmentedActionContextTask): void;
    [TaskATypes.CREATE_TASK]({ commit }: AugmentedActionContextTask, payload: Task): void;
    [TaskATypes.EDIT_TASK](
        { commit }: AugmentedActionContextTask,
        payload: { index: number; id: number; updatedTask: Task }
    ): void;
    [TaskATypes.CHANGE_STATUS](
        { commit }: AugmentedActionContextTask,
        payload: { id: number; status_slug: string; index: number }
    ): void;
    [TaskATypes.DELETE_TASK]({ commit }: AugmentedActionContextTask, id: number): void;
}
export interface StoreActions extends RootActionsTypes, TaskActionsTypes {}

export interface StoreGetters extends IRootGettersTypes, TaskGettersTypes {}
