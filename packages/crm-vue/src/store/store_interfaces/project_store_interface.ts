import { ActionContext } from 'vuex'
import { IRootState } from '../register'
/******************* [Project]*********************/
import { MutationTypes as ProjectMTypes } from '../modules/project/mutation-types'
import { ActionTypes as ProjectATypes } from '../modules/project/action-types'
/******************* (DATA MODELS) *********************/
import { Project } from '@/interfaces/Project'
/*********************** Project MODULE TYPES  ***********************/
export interface ProjectStateTypes {
  projects: Project[] | null
  isLoading: boolean
}

export interface ProjectGettersTypes {
  getProjects(state: ProjectStateTypes): null | Project[]
  isProjectsLoading(state: ProjectStateTypes): boolean
}

export type ProjectMutationsTypes<S = ProjectStateTypes> = {
  [ProjectMTypes.SET_PROJECTS](state: S, payload: Project[]): void
  [ProjectMTypes.UPDATE_PROJECT](
    state: S,
    payload: { index: number; updatedProject: Project }
  ): void
  [ProjectMTypes.ADD_PROJECT](state: S, project: Project): void
  [ProjectMTypes.DELETE_PROJECT](state: S, id: number): void
  [ProjectMTypes.SET_LOADING](state: S, payload: boolean): void
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
    payload: Project
  ): Promise<unknown>
  [ProjectATypes.CREATE_PROJECT](
    { commit }: AugmentedActionContextProject,
    project: Project
  ): Promise<unknown>
  [ProjectATypes.UPDATE_PROJECT](
    { commit }: AugmentedActionContextProject,
    payload: { index: number; updatedProject: Project }
  ): Promise<unknown>
  [ProjectATypes.DELETE_PROJECT](
    { commit }: AugmentedActionContextProject,
    id: number
  ): Promise<unknown>
}
