/* eslint-disable no-async-promise-executor */
import { ActionTree } from 'vuex'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'
import { IRootState } from '@/store/register'
import {
  ProjectActionsTypes,
  ProjectStateTypes
} from '@/store/store_interfaces/project_store_interface'
import api from '@/utils/api'
import { handleApi } from '@/utils/helpers'
import { Project } from '@/interfaces/Project'

export const actions: ActionTree<ProjectStateTypes, IRootState> & ProjectActionsTypes = {
  // FETCH ALL PROJECTS
  [ActionTypes.FETCH_PROJECTS]({ commit }): Promise<unknown> {
    return new Promise(async (resolve, reject): Promise<void> => {
      commit(MutationTypes.SET_PROJECTS_LOADING, true)
      const promise = api.get('/api/projects/get')
      const [data, error] = await handleApi(promise)
      if (error) {
        commit(MutationTypes.SET_PROJECTS_LOADING, false)
        reject(error)
        return
      }
      commit(MutationTypes.SET_PROJECTS_LOADING, false)
      commit(MutationTypes.SET_PROJECTS, data.data['data'])
      resolve(data)
    })
  },
  // FETCH SINGLE PROJECT
  [ActionTypes.FETCH_SINGLE_PROJECT](
    { commit },
    payload: Project | string | number
  ): Promise<unknown> {
    return new Promise(async (resolve, reject): Promise<void> => {
      commit(MutationTypes.SET_PROJECTS_LOADING, true)
      const promise = api.get(`/api/projects/show/${payload}`)
      const [data, error] = await handleApi(promise)
      if (error) {
        commit(MutationTypes.SET_PROJECTS_LOADING, false)
        reject(error)
        return
      }
      const project: Project = data.data['data']
      commit(MutationTypes.SET_PROJECTS_LOADING, false)
      if (project.tasks != null) {
        commit(MutationTypes.CAST_PROJECT_TASKS, project.tasks)
      }
      resolve(data)
    })
  },
  // CREATE PROJECT
  [ActionTypes.CREATE_PROJECT]({ commit }, project: Project): Promise<unknown> {
    return new Promise(async (resolve, reject): Promise<void> => {
      const promise = api.post(`/api/projects/create`, project)
      const [data, error] = await handleApi(promise)
      if (error) {
        reject(error)
        return
      }
      commit(MutationTypes.ADD_PROJECT, project)
      resolve(data)
    })
  },
  // UPDATE A PROJECT
  [ActionTypes.UPDATE_PROJECT](
    { commit },
    payload: { index: number; updatedProject: Project }
  ): Promise<unknown> {
    return new Promise(async (resolve, reject) => {
      const response = api.put(
        `/api/projects/update/${payload.updatedProject.slug}`,
        payload.updatedProject
      )
      const [data, error] = await handleApi(response)
      if (error) {
        reject(error)
        return
      }
      commit(MutationTypes.UPDATE_PROJECT, {
        index: payload.index,
        updatedProject: data.data['data']
      })
      resolve(data)
    })
  },
  // UPDATE A PROJECT
  [ActionTypes.DELETE_PROJECT]({ commit }, slug: string): Promise<unknown> {
    return new Promise(async (resolve, reject) => {
      const response = api.delete(`/api/projects/delete/${slug}`)
      const [, error] = await handleApi(response)
      if (error) {
        reject(error)
        return
      }
      commit(MutationTypes.DELETE_PROJECT, slug)
      resolve(null)
    })
  },
  // CHANGE A PROJECT TASK STATUS
  [ActionTypes.CHANGE_PROJECT_TASK_STATUS](
    { commit },
    payload: {
      slug: string
      status: string
    }
  ): Promise<unknown> {
    return new Promise(async (resolve, reject) => {
      const promise = api.put(`/api/tasks/changestatus/${payload.slug}`, {
        status_slug: payload.status
      })
      const [data, error] = await handleApi(promise)
      if (error) {
        // TODO: HANDLE ERROR IN THE CALL LOCATION
        reject(error)
        return
      }

      resolve(data)
    })
  }
}
