
import { ActionContext, DispatchOptions } from "vuex";
/******************* [ROOT] *********************/
import { MutationTypes as RootMTypes } from "../modules/root/mutation-types";
import { ActionTypes as RootATypes } from "../modules/root/action-types";
import { IRootState, IUserData, StoreActions } from "../register";
export interface IRootGettersTypes {
  getVersion(state: IRootState): string;
  getUserList(state: IRootState): IUserData[];
}

export type RootMutationsTypes<S = IRootState> = {
  [RootMTypes.UPDATE_VERSION](state: S, payload: string): void;
  [RootMTypes.USER_LISTS](state: S, payload: IUserData[]): void;
};

type AugmentedActionContextRoot = {
  commit<K extends keyof RootMutationsTypes>(
    key: K,
    payload: Parameters<RootMutationsTypes[K]>[1]
  ): ReturnType<RootMutationsTypes[K]>;
} & Omit<ActionContext<IRootState, IRootState>, "commit"> & {
  dispatch<K extends keyof StoreActions>(
    key: K,
    payload?: Parameters<StoreActions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<StoreActions[K]>;
};

export interface RootActionsTypes {
  [RootATypes.UPDATE_VERSION]({ commit }: AugmentedActionContextRoot, payload: string): void;
  [RootATypes.COUNTER_CHECK]({ dispatch }: AugmentedActionContextRoot, payload: boolean): void;
  [RootATypes.USER_LISTS]({ dispatch }: AugmentedActionContextRoot, payload: IUserData[]): void;
}
