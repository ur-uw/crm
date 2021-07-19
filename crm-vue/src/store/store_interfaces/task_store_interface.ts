import { ActionContext } from 'vuex';
/******************* [TASK]*********************/
import { MutationTypes as TaskMTypes } from "../modules/task/mutation-types";
import { ActionTypes as TaskATypes } from "../modules/task/action-types";
/******************* (DATA MODELS) *********************/
import { Task } from "@/interfaces/Task";
import { IRootState } from '../register';

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