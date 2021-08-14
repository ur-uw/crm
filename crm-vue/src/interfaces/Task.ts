import { Priority } from './Priority'
import { Status } from './Status'
export interface Task {
  id?: number
  title?: string
  status_id?: number
  status?: Status
  slug?: string
  priority?: Priority
  description?: string
  start_date?: Date | string | number
  due_date?: Date | string | number
  created_at?: Date | string
  updated_at?: Date | string
}
