import { AuthStateTypes } from '@/store/store_interfaces/auth_store_interface'
const token = localStorage.getItem('token')
export const state: AuthStateTypes = {
  user: null,
  token: token,
  isLoading: false,
  // TODO: ADD A WAY TO CHECK IF THE USER IS NOT NULL IN ADDITION TO TOKEN CHECKING
  isLoggedIn: token !== null && token !== ''
}
