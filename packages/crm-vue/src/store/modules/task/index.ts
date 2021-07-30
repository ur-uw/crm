import { Module } from 'vuex'
import { IRootState } from '@/store/register'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { state } from './state'
import { TaskStateTypes } from '@/store/store_interfaces/task_store_interface'

// Module
const task: Module<TaskStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions
}

export default task
