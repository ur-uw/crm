import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { Project } from '@/interfaces/Project'
import {
  ProjectMutationsTypes,
  ProjectStateTypes
} from '@/store/store_interfaces/project_store_interface'
import { sortByUpdatedAt } from '@/utils/helpers'
import { Task } from '@/interfaces/Task'
import task from '../task'
export const mutations: MutationTree<ProjectStateTypes> & ProjectMutationsTypes = {
  [MutationTypes.SET_PROJECTS](state: ProjectStateTypes, data: Project[]): void {
    state.projects = data
  },
  [MutationTypes.UPDATE_PROJECT](
    state: ProjectStateTypes,
    payload: { index: number; updatedProject: Project }
  ): void {
    if (state.projects !== null) {
      state.projects[payload.index] = payload.updatedProject
      state.projects.sort(sortByUpdatedAt)
    }
  },
  [MutationTypes.DELETE_PROJECT](state: ProjectStateTypes, slug: string): void {
    if (state.projects != null) {
      state.projects = state.projects?.filter((p) => p.slug !== slug)
    }
  },
  [MutationTypes.ADD_PROJECT](state: ProjectStateTypes, project: Project): void {
    if (state.projects != null) {
      state.projects.unshift(project)
    }
  },
  [MutationTypes.SET_PROJECTS_LOADING](state: ProjectStateTypes, value: boolean): void {
    state.isLoading = value
  },
  [MutationTypes.DELETE_PROJECT_TASK](state: ProjectStateTypes, payload: Task): void {
    const taskType = payload.status?.slug as
      | 'waiting'
      | 'approved'
      | 'rejected'
      | 'completed'
      | 'inprogress'
    if (taskType != null) {
      state.selectedProjectTasks[taskType] = state.selectedProjectTasks[taskType].filter(
        (el) => el.slug !== payload.slug
      )
    }
  },
  [MutationTypes.EDIT_PROJECT_TASK](state: ProjectStateTypes, payload: Task): void {
    const taskType = payload.status?.slug as
      | 'waiting'
      | 'approved'
      | 'rejected'
      | 'completed'
      | 'inprogress'
    if (taskType != null) {
      const tasks = state.selectedProjectTasks[taskType]
      const index = tasks.findIndex((el) => el.slug === payload.slug)
      tasks[index] = payload
    }
  },

  [MutationTypes.CAST_PROJECT_TASKS](state: ProjectStateTypes, payload: Task[]) {
    if (payload != null) {
      // RESTING THE OBJECT SO WHEN THE USER GOES BACK AND RETURN IT WILL RE-CAST THE LISTS
      state.selectedProjectTasks = {
        waiting: [],
        approved: [],
        inprogress: [],
        completed: [],
        rejected: []
      }
      const checkTaskStatus = (task: Task) => {
        switch (task.status?.slug) {
          case 'waiting':
            state.selectedProjectTasks.waiting.unshift(task)
            break
          case 'approved':
            state.selectedProjectTasks.approved.unshift(task)
            break
          case 'inprogress':
            state.selectedProjectTasks.inprogress.unshift(task)
            break
          case 'completed':
            state.selectedProjectTasks.completed.unshift(task)
            break
          case 'rejected':
            state.selectedProjectTasks.rejected.unshift(task)
            break
          default:
            // TODO: IMPLEMENT DEFAULT CASE
            console.log(task.status?.name)
            break
        }
      }

      payload.forEach(checkTaskStatus)
    }
  }
}
