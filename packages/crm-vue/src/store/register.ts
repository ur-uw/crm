/******************* [Root] *********************/
import { IRootGettersTypes, RootActionsTypes } from './store_interfaces/root_store_interface'
/******************* [Auth] *********************/
import {
  AuthActionsTypes,
  AuthGettersTypes,
  AuthStateTypes
} from './store_interfaces/auth_store_interface'
/******************* [Task] *********************/
import {
  TaskActionsTypes,
  TaskGettersTypes,
  TaskStateTypes
} from './store_interfaces/task_store_interface'
/******************* [Project] *********************/
import {
  ProjectActionsTypes,
  ProjectGettersTypes,
  ProjectStateTypes
} from './store_interfaces/project_store_interface'

export interface IUserData {
  id: number
  userId: number
  title: string
  body: string
}
export interface IRootState {
  root: boolean
  version: string
  userlists: any[]
}

export interface IMergedState extends IRootState {
  authModule: AuthStateTypes
  projectModule: ProjectStateTypes
  taskModule: TaskStateTypes
}

export interface StoreActions
  extends RootActionsTypes,
    AuthActionsTypes,
    ProjectActionsTypes,
    TaskActionsTypes {}
export interface StoreGetters
  extends IRootGettersTypes,
    AuthGettersTypes,
    ProjectGettersTypes,
    TaskGettersTypes {}
