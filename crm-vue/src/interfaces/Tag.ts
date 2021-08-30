import { Task } from './Task'
export default interface Tag {
  name?: string
  slug?: string
  color?: string
  tasks?: Task[]
}

export type TagProgress = {
  tag_name: string
  percentage: number
  color: string
}
