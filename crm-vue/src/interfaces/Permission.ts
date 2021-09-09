import { User } from './User'

export default interface Permission {
  id?: number
  name?: string
  display_name?: string
  description?: string
  users?: User[]
  created_at?: string
  updated_at?: string
}
