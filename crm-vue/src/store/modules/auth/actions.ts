/* eslint-disable no-async-promise-executor */
import { ActionTree } from 'vuex'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { IRootState } from '@/store/register'
import { AuthActionsTypes, AuthStateTypes } from '@/store/store_interfaces/auth_store_interface'
import api from '@/utils/api'
import { handleApi } from '@/utils/helpers'
import { User } from '@/interfaces/User'

export const actions: ActionTree<AuthStateTypes, IRootState> & AuthActionsTypes = {
  [ActionTypes.LOGIN]({ commit }, payload: { email: string; password: string }): Promise<any> {
    return new Promise(async (resolve, reject): Promise<void> => {
      if (payload.email !== null && payload.password !== null) {
        commit(MutationTypes.SET_LOADING, true)
        const promise = api.post('/api/auth/login', {
          ...payload,
          device_name: navigator.userAgent
        })
        const [data, error] = await handleApi(promise)
        if (error) {
          commit(MutationTypes.SET_LOADING, false)
          localStorage.removeItem('token')
          commit(MutationTypes.SET_USER, null)
          commit(MutationTypes.SET_TOKEN, null)
          reject(error)
          return
        }
        const token = data.data['token']
        localStorage.setItem('token', token)
        commit(MutationTypes.SET_LOADING, false)
        commit(MutationTypes.SET_USER, data.data['user'])
        commit(MutationTypes.SET_TOKEN, token)
        commit(MutationTypes.SET_LOGIN_STATE, true)
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
        resolve(data)
      } else {
        reject('Credentials are required')
      }
    })
  },
  async [ActionTypes.REGISTER](
    { commit },
    payload: {
      name: string
      email: string
      password: string
      password_confirmation: string
      phone_number: string
    }
  ) {
    return new Promise(async (resolve, reject) => {
      commit(MutationTypes.SET_LOADING, true)
      const promise = api.post('/api/auth/register', {
        ...payload,
        // TODO: implement slugs and remove this
        slug: Math.random().toString(),
        device_name: navigator.userAgent
      })
      const [data, error] = await handleApi(promise)
      if (error) {
        commit(MutationTypes.SET_LOADING, false)
        localStorage.removeItem('token')
        commit(MutationTypes.SET_USER, null)
        commit(MutationTypes.SET_TOKEN, null)
        reject(error)
        return
      }
      console.log(data)
      const token = data.data['token']
      localStorage.setItem('token', token)
      commit(MutationTypes.SET_LOADING, false)
      commit(MutationTypes.SET_USER, data.data['user'])
      commit(MutationTypes.SET_TOKEN, token)
      commit(MutationTypes.SET_LOGIN_STATE, true)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      resolve(data)
    })
  },
  async [ActionTypes.LOGOUT]({ commit }) {
    return new Promise(async (resolve, reject) => {
      commit(MutationTypes.SET_LOADING, true)
      const response = api.get('/api/auth/logout')
      const [data, error] = await handleApi(response)
      if (error) {
        reject(error)
        return
      }

      localStorage.removeItem('token')
      commit(MutationTypes.SET_LOADING, false)
      commit(MutationTypes.SET_USER, null)
      commit(MutationTypes.SET_TOKEN, null)
      commit(MutationTypes.SET_LOGIN_STATE, false)
      resolve(data)
    })
  },
  [ActionTypes.GET_USER]({ commit }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      commit(MutationTypes.SET_LOADING, true)
      const response = api.get('/api/user/get_info')
      const [data, error] = await handleApi(response)
      if (error) {
        commit(MutationTypes.SET_LOADING, false)
        reject(error)
        return
      }
      commit(MutationTypes.SET_USER, data.data['data'])
      commit(MutationTypes.SET_LOADING, false)
      resolve(data)
    })
  },
  // TODO: MAKE SEPARATE USER MODULE FOR THESE METHODS
  [ActionTypes.UPDATE_USER_INFO](
    { commit },
    payload: { newInfo: User; additional?: any }
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      let newUserData = payload.newInfo
      if (payload.additional !== null) {
        newUserData = {
          ...newUserData,
          ...payload.additional
        }
      }

      const response = api.post(`/api/user/update/${payload.newInfo.id}`, newUserData)
      const [data, error] = await handleApi(response)
      if (error) {
        reject(error)
        return
      }
      commit(MutationTypes.SET_USER, data.data['data'])
      resolve(data)
    })
  }
}
