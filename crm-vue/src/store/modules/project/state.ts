import { ProjectStateTypes } from '@/store/store_interfaces/project_store_interface'

export const state: ProjectStateTypes = {
  projects: null,
  isLoading: false,
  selectedProjectTasks: {
    waiting: [],
    approved: [],
    inprogress: [],
    completed: [],
    rejected: []
  }
}
