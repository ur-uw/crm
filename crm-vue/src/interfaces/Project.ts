import { User } from './User'
import { Task } from './Task'
import { TagProgress } from './Tag'
export type SelectedProjectTasksTypes = {
  waiting: Task[]
  approved: Task[]
  inprogress: Task[]
  completed: Task[]
  rejected: Task[]
}
export interface Project {
  id: number
  name: string
  description?: string
  slug: string
  owner?: User
  tasks?: Task[]
  users?: User[]
  tags_progress?: TagProgress[]
  created_at?: string | Date
  updated_at?: string | Date
}
