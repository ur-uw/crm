import { AuthStateTypes } from '@/store/store_interfaces/auth_store_interface'
const token = localStorage.getItem('token')
export const state: AuthStateTypes = {
  user: null,
  token: token,
  isLoading: false,
  isLoggedIn: token != null
}
