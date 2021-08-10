import { Task } from './Task'

export interface Status {
  id?: number
  name?: string
  color?: string
  slug?: string
  tasks?: Task[]
}
