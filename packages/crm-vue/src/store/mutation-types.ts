import { MutationTypes as taskTypes } from './modules/task/mutation-types'
import { MutationTypes as authTypes } from './modules/auth/mutation-types'
import { MutationTypes as projectTypes } from './modules/project/mutation-types'

export const AllMutationTypes = { ...projectTypes, ...taskTypes, ...authTypes }
