import { User } from '@/interfaces/User'
import { AuthMutationsTypes, AuthStateTypes } from '@/store/store_interfaces/auth_store_interface'
import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'

export const mutations: MutationTree<AuthStateTypes> & AuthMutationsTypes = {
  [MutationTypes.SET_LOADING](state: AuthStateTypes, payload: boolean) {
    state.isLoading = payload
  },
  [MutationTypes.SET_LOGIN_STATE](state: AuthStateTypes, payload: boolean): void {
    state.isLoggedIn = payload
  },
  [MutationTypes.SET_USER](state: AuthStateTypes, payload: User): void {
    if (payload)
      if (state.user !== null) {
        state.user = {
          ...state.user,
          ...payload
        }
      } else {
        state.user = payload
      }
    else state.user = null
  },
  [MutationTypes.SET_TOKEN](state: AuthStateTypes, payload: string): void {
    state.token = payload
  }
}
