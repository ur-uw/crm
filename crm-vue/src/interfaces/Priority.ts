import { Task } from './Task'

export interface Priority {
  id?: number
  name?: string
  slug?: string
  color?: string
  tasks?: Task[]
}
