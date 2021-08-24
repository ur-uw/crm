import { ActionContext } from 'vuex'
import { IRootState } from '../register'
/******************* [Project]*********************/
import { MutationTypes as ProjectMTypes } from '../modules/project/mutation-types'
import { ActionTypes as ProjectATypes } from '../modules/project/action-types'
/******************* (DATA MODELS) *********************/
import { Project, SelectedProjectTasksTypes } from '@/interfaces/Project'
import { Task } from '@/interfaces/Task'
/*********************** Project MODULE TYPES  ***********************/

export interface ProjectStateTypes {
  projects: Project[] | null
  selectedProjectTasks: SelectedProjectTasksTypes
  isLoading: boolean
}

export interface ProjectGettersTypes {
  getProjects(state: ProjectStateTypes): null | Project[]
  getSelectedProjectTasks(state: ProjectStateTypes): SelectedProjectTasksTypes
  isProjectsLoading(state: ProjectStateTypes): boolean
}

export type ProjectMutationsTypes<S = ProjectStateTypes> = {
  [ProjectMTypes.SET_PROJECTS](state: S, payload: Project[]): void
  [ProjectMTypes.UPDATE_PROJECT](
    state: S,
    payload: { index: number; updatedProject: Project }
  ): void
  [ProjectMTypes.ADD_PROJECT](state: S, project: Project): void
  [ProjectMTypes.DELETE_PROJECT](state: S, slug: string): void
  [ProjectMTypes.SET_PROJECTS_LOADING](state: S, payload: boolean): void
  [ProjectMTypes.CAST_PROJECT_TASKS](state: S, payload: Task[]): void
  [ProjectMTypes.DELETE_PROJECT_TASK](state: S, payload: Task): void
  [ProjectMTypes.EDIT_PROJECT_TASK](state: S, payload: Task): void
}

export type AugmentedActionContextProject = {
  commit<K extends keyof ProjectMutationsTypes>(
    key: K,
    payload: Parameters<ProjectMutationsTypes[K]>[1]
  ): ReturnType<ProjectMutationsTypes[K]>
} & Omit<ActionContext<ProjectStateTypes, IRootState>, 'commit'>

export interface ProjectActionsTypes {
  [ProjectATypes.FETCH_PROJECTS]({ commit }: AugmentedActionContextProject): Promise<unknown>

  [ProjectATypes.FETCH_SINGLE_PROJECT](
    { commit }: AugmentedActionContextProject,
    payload: Project | string | number
  ): Promise<unknown>
  [ProjectATypes.CREATE_PROJECT](
    { commit }: AugmentedActionContextProject,
    project: Project
  ): Promise<unknown>
  [ProjectATypes.UPDATE_PROJECT](
    { commit }: AugmentedActionContextProject,
    payload: { index: number; updatedProject: Project }
  ): Promise<unknown>
  [ProjectATypes.CHANGE_PROJECT_TASK_STATUS](
    { commit }: AugmentedActionContextProject,
    payload: { slug: string; status: string }
  ): Promise<unknown>
  [ProjectATypes.DELETE_PROJECT](
    { commit }: AugmentedActionContextProject,
    slug: string
  ): Promise<unknown>
}
