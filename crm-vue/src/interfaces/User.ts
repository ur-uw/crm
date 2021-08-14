import { Image } from './Image'

export interface User {
  id?: number
  name?: string
  slug?: string
  email?: string
  phone?: string
  email_verified_at?: Date
  images?: Image[]
  created_at?: Date
  updated_at?: Date
}
