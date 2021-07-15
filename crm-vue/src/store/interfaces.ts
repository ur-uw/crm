import { ActionContext, DispatchOptions } from "vuex";
/******************* [DAILY TASK]*********************/
import { MutationTypes as DailyTaskMTypes } from "./modules/daily_task/mutation-types";
import { ActionTypes as DailyTaskATypes } from "./modules/daily_task/action-types";
/******************* [ROOT] *********************/
import { MutationTypes as RootMTypes } from "./modules/root/mutation-types";
import { ActionTypes as RootATypes } from "./modules/root/action-types";
/******************* (DATA MODELS) *********************/
import { DailyTask } from "@/interfaces/Task";

export interface IUserData {
  id: number
  userId: number
  title: string
  body: string
}
export interface IRootState {
  root: boolean;
  version: string;
  userlists: any[]
}

export interface IMergedState extends IRootState {
  dailyTaskModule: DailyTaskStateTypes;
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
  [RootATypes.UPDATE_VERSION](
    { commit }: AugmentedActionContextRoot,
    payload: string
  ): void;
  [RootATypes.COUNTER_CHECK](
    { dispatch }: AugmentedActionContextRoot,
    payload: boolean
  ): void;
  [RootATypes.USER_LISTS](
    { dispatch }: AugmentedActionContextRoot,
    payload: IUserData[]
  ): void;
}

/*********************** DAILY TASK MODULE TYPES  ***********************/
export interface DailyTaskStateTypes {
  tasks: DailyTask[] | null,
  isLoading: boolean,
}

export interface DailyTaskGettersTypes {
  getAllTasks(state: DailyTaskStateTypes): DailyTask[];
  getLoadingState(state: DailyTaskStateTypes): boolean;
}

export type DailyTaskMutationsTypes<S = DailyTaskStateTypes> = {
  [DailyTaskMTypes.SET_ITEMS](state: S, data: DailyTask[]): void;
  [DailyTaskMTypes.ADD_TASK](state: S, data: DailyTask): void;
  [DailyTaskMTypes.SET_ITEM](state: S, newTask: { data: DailyTask, taskId: string }): void;
  [DailyTaskMTypes.SET_LOADING](state: S, value: boolean): void;
  [DailyTaskMTypes.DELETE_TASK](state: S, taskId: string): void;
};

export type AugmentedActionContextDailyTask = {
  commit<K extends keyof DailyTaskMutationsTypes>(
    key: K,
    payload: Parameters<DailyTaskMutationsTypes[K]>[1]
  ): ReturnType<DailyTaskMutationsTypes[K]>;
} & Omit<ActionContext<DailyTaskStateTypes, IRootState>, "commit">;

export interface DailyTaskActionsTypes {
  [DailyTaskATypes.FETCH_TASKS](
    { commit }: AugmentedActionContextDailyTask,
  ): void;
  [DailyTaskATypes.CREATE_TASK](
    { commit }: AugmentedActionContextDailyTask,
    payload: DailyTask
  ): void;
  [DailyTaskATypes.EDIT_TASK](
    { commit }: AugmentedActionContextDailyTask,
    payload: { data: DailyTask, taskId: string }
  ): void;
  [DailyTaskATypes.DELETE_TASK](
    { commit }: AugmentedActionContextDailyTask,
    payload: string
  ): void;
}

export interface StoreActions
  extends RootActionsTypes,
  DailyTaskActionsTypes { }

export interface StoreGetters
  extends IRootGettersTypes,
  DailyTaskGettersTypes { }
