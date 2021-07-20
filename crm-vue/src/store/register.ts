/******************* [Root] *********************/

import { AuthActionsTypes, AuthGettersTypes, AuthStateTypes } from "./store_interfaces/auth_store_interface";
import { IRootGettersTypes, RootActionsTypes } from "./store_interfaces/root_store_interface";
/******************* [Task] *********************/

import { TaskActionsTypes, TaskGettersTypes, TaskStateTypes } from "./store_interfaces/task_store_interface";

export interface IUserData {
    id: number;
    userId: number;
    title: string;
    body: string;
}
export interface IRootState {
    root: boolean;
    version: string;
    userlists: any[];
}

export interface IMergedState extends IRootState {
    taskModule: TaskStateTypes;
    authModule: AuthStateTypes,
}



export interface StoreActions extends RootActionsTypes, AuthActionsTypes, TaskActionsTypes { }
export interface StoreGetters extends IRootGettersTypes, AuthGettersTypes, TaskGettersTypes { }
