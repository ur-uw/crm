import { Address } from './Address'
import { Image } from './Image'

export interface User {
  id?: number
  name?: string
  first_name?: string
  last_name?: string
  slug?: string
  email?: string
  phone?: string
  email_verified_at?: Date
  profile_image: Image
  images?: Image[]
  addresses: Address[]
  created_at?: Date
  updated_at?: Date
}
