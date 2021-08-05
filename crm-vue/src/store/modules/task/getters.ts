import { Task } from '@/interfaces/Task'
import { GetterTree } from 'vuex'
import { IRootState } from '@/store/register'
import { TaskGettersTypes, TaskStateTypes } from '@/store/store_interfaces/task_store_interface'
export const getters: GetterTree<TaskStateTypes, IRootState> & TaskGettersTypes = {
  getRecentTasks(state: TaskStateTypes): Task[] {
    return state.recentTasks ?? []
  },
  getTodayTasks(state: TaskStateTypes): Task[] {
    return state.todayTasks ?? []
  },
  getTasksLoadingState(state: TaskStateTypes): boolean {
    return state.isLoading
  }
}
