import { ActionContext } from 'vuex'
/******************* [TASK]*********************/
import { MutationTypes as TaskMTypes } from '../modules/task/mutation-types'
import { ActionTypes as TaskATypes } from '../modules/task/action-types'
/******************* (DATA MODELS) *********************/
import { Task } from '@/interfaces/Task'
import { IRootState } from '../register'

/*********************** TASK MODULE TYPES  ***********************/
export interface TaskStateTypes {
  tasks: Task[] | null
  todayTasks: Task[] | null
  recentTasks: Task[] | null
  isLoading: boolean
}

export interface TaskGettersTypes {
  getRecentTasks(state: TaskStateTypes): Task[]
  getTodayTasks(state: TaskStateTypes): Task[]
  getTasksLoadingState(state: TaskStateTypes): boolean
}

export type TaskMutationsTypes<S = TaskStateTypes> = {
  [TaskMTypes.SET_PROJECT_TASKS](state: S, data: Task[]): void
  [TaskMTypes.SET_RECENT_TASKS](state: S, data: Task[]): void
  [TaskMTypes.SET_TODAY_TASKS](state: S, data: Task[]): void
  [TaskMTypes.ADD_ITEM](state: S, data: Task): void
  [TaskMTypes.SET_ITEM](state: S, payload: { index: number; updatedTask: Task }): void
  [TaskMTypes.SET_LOADING](state: S, value: boolean): void
  [TaskMTypes.CHANGE_STATUS](state: S, payload: { index: number; updatedTask: Task }): void
  [TaskMTypes.DELETE_TASK](state: S, id: number): void
}

export type AugmentedActionContextTask = {
  commit<K extends keyof TaskMutationsTypes>(
    key: K,
    payload: Parameters<TaskMutationsTypes[K]>[1]
  ): ReturnType<TaskMutationsTypes[K]>
} & Omit<ActionContext<TaskStateTypes, IRootState>, 'commit'>

export interface TaskActionsTypes {
  [TaskATypes.FETCH_TASKS]({ commit }: AugmentedActionContextTask): Promise<unknown>
  [TaskATypes.FETCH_RECENT_TASKS]({ commit }: AugmentedActionContextTask): Promise<unknown>
  [TaskATypes.FETCH_TASKS_FOR_DATE](
    { commit }: AugmentedActionContextTask,
    payload: string
  ): Promise<unknown>
  [TaskATypes.CREATE_TASK]({ commit }: AugmentedActionContextTask, payload: Task): Promise<unknown>
  [TaskATypes.EDIT_TASK](
    { commit }: AugmentedActionContextTask,
    payload: { index: number; id: number; updatedTask: Task }
  ): Promise<unknown>
  [TaskATypes.CHANGE_STATUS](
    { commit }: AugmentedActionContextTask,
    payload: { id: number; status_slug: string; index: number }
  ): Promise<unknown>
  [TaskATypes.DELETE_TASK]({ commit }: AugmentedActionContextTask, id: number): void
}
