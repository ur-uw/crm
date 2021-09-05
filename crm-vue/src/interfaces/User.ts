import { Address } from './Address'
import Contact from './Contact'
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
  profile_image?: Image
  images?: Image[]
  addresses: Address[]
  contacts: Contact[]
  created_at?: Date
  updated_at?: Date
}
