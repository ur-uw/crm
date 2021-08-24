import { Address } from './Address'
import { Image } from './Image'

export interface User {
  id?: number
  name?: string
  slug?: string
  email?: string
  phone?: string
  email_verified_at?: Date
  images?: Image[]
  addresses: Address[]
  created_at?: Date
  updated_at?: Date
}
