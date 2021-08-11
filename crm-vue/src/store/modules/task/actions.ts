/* eslint-disable no-async-promise-executor */
import { handleApi } from '@/utils/helpers'
import { Task } from '@/interfaces/Task'
import { ActionTree } from 'vuex'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { IRootState } from '@/store/register'
import api from '@/utils/api'
import { TaskActionsTypes, TaskStateTypes } from '@/store/store_interfaces/task_store_interface'

export const actions: ActionTree<TaskStateTypes, IRootState> & TaskActionsTypes = {
  // FETCH TASKS
  async [ActionTypes.FETCH_TASKS]({ commit }) {
    return new Promise(async (resolve, reject) => {
      commit(MutationTypes.SET_LOADING, true)
      const res = api.get('/api/tasks/get')
      const [data, error] = await handleApi(res)
      if (error) {
        reject(error)
        return
      }
      commit(MutationTypes.SET_LOADING, false)
      commit(MutationTypes.SET_PROJECT_TASKS, data.data['data'])
      resolve(data)
    })
  },
  // FETCH RECENT TASKS
  async [ActionTypes.FETCH_RECENT_TASKS]({ commit }) {
    return new Promise(async (resolve, reject) => {
      commit(MutationTypes.SET_LOADING, true)
      const res = api.get('/api/tasks/recently/3')
      const [data, error] = await handleApi(res)
      if (error) {
        reject(error)
        return
      }
      commit(MutationTypes.SET_LOADING, false)
      commit(MutationTypes.SET_RECENT_TASKS, data.data['data'])
      resolve(data)
    })
  },
  // FETCH TASKS BASED ON A DATE
  async [ActionTypes.FETCH_TASKS_FOR_DATE]({ commit }, payload: string) {
    return new Promise(async (resolve, reject) => {
      commit(MutationTypes.SET_LOADING, true)
      const res = api.get(`/api/tasks/for/${payload}`)
      const [data, error] = await handleApi(res)
      if (error) {
        reject(error)
        return
      }
      commit(MutationTypes.SET_LOADING, false)
      commit(MutationTypes.SET_TODAY_TASKS, data.data['data'])
      resolve(data)
    })
  },
  // CREATE TASK
  async [ActionTypes.CREATE_TASK]({ commit }, task: Task) {
    return new Promise(async (resolve, reject) => {
      const response = api.post('/api/tasks/create', task)
      const [data, error] = await handleApi(response)
      if (error) {
        reject(error)
        return
      }
      const newTask: Task = data.data['data']
      commit(MutationTypes.ADD_ITEM, newTask)
      resolve(data)
    })
  },
  // UPDATE TASK
  async [ActionTypes.EDIT_TASK](
    { commit },
    payload: { index: number; id: number; updatedTask: Task }
  ) {
    return new Promise(async (resolve, reject) => {
      const response = api.put(`/api/tasks/update/${payload.id}`, payload.updatedTask)
      const [data, error] = await handleApi(response)
      if (error) {
        reject(error)
        return
      }
      commit(MutationTypes.SET_ITEM, {
        index: payload.index,
        updatedTask: data.data['data']
      })
      resolve(data)
    })
  },
  // CHANGE TASK STATUS
  async [ActionTypes.CHANGE_STATUS](
    { commit },
    payload: { id: number; index: number; status_slug: string }
  ) {
    return new Promise(async (resolve, reject) => {
      const response = api.put(`/api/tasks/changestatus/${payload.id}`, {
        status_slug: payload.status_slug
      })
      const [data, error] = await handleApi(response)
      if (error) {
        reject(error)
        return
      }
      commit(MutationTypes.CHANGE_STATUS, {
        index: payload.index,
        updatedTask: data.data['data']
      })
      resolve(data)
    })
  },
  // DELETE TASK
  async [ActionTypes.DELETE_TASK]({ commit }, id: number) {
    return new Promise(async (resolve, reject) => {
      const response = api.delete(`/api/tasks/delete/${id}`)
      const [data, error] = await handleApi(response)
      if (error) {
        reject(error)
        return
      }
      commit(MutationTypes.DELETE_TASK, id)
      resolve(data)
    })
  }
}
