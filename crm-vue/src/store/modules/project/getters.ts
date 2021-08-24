import { GetterTree } from 'vuex'
import { IRootState } from '@/store/register'
import {
  ProjectGettersTypes,
  ProjectStateTypes
} from '@/store/store_interfaces/project_store_interface'
import { Project } from '@/interfaces/Project'
export const getters: GetterTree<ProjectStateTypes, IRootState> & ProjectGettersTypes = {
  getProjects(state: ProjectStateTypes): null | Project[] {
    return state.projects
  },
  getSelectedProjectTasks(state: ProjectStateTypes) {
    return state.selectedProjectTasks
  },
  isProjectsLoading(state: ProjectStateTypes): boolean {
    return state.isLoading
  }
}
