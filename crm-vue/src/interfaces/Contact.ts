import { User } from './User'

export default interface Contact {
  id?: number
  type?: 'friend' | 'customer'
  is_blocked?: boolean
  contact_info: User
}
