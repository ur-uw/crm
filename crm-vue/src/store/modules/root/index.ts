import { Module, ModuleTree } from 'vuex'
import { IRootState } from '@/store/register'
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'
import { state } from './state'
import task from '../task'
import auth from '../auth'
import project from '../project'

// Modules
const modules: ModuleTree<IRootState> = {
  auth,
  project,
  task
}

const root: Module<IRootState, IRootState> = {
  state,
  getters,
  mutations,
  actions,
  modules
}

export default root
