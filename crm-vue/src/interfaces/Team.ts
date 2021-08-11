import { Project } from './Project'
import { Task } from './Task'
import { User } from './User'

export interface Team {
  name?: string
  display_name?: string
  description?: string
  slug?: string
  users?: User[]
  tasks?: Task[]
  project?: Project
}
