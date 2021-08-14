import { Task } from './Task'

export interface Priority {
  id?: number
  name?: string
  color?: string
  slug?: string
  tasks?: Task[]
}
