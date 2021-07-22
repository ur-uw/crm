import { ActionContext } from "vuex";
import { IRootState } from "../register";
/******************* [User]*********************/
import { MutationTypes as UserMTypes } from "../modules/user/mutation-types";
import { ActionTypes as UserATypes } from "../modules/user/action-types";
import { User } from "@/interfaces/User";
/*********************** User MODULE TYPES  ***********************/
export interface UserStateTypes {
    user: User | null;
    isLoading: boolean;
}

export interface UserGettersTypes {
    isLoading(state: UserStateTypes): boolean;
    getCurrentUser(state: UserStateTypes): string | null;
}

export type UserMutationsTypes<S = UserStateTypes> = {
    [UserMTypes.SET_USER](state: S, payload: User): void;
    [UserMTypes.SET_LOADING](state: S, payload: boolean): void;
};

export type AugmentedActionContextUser = {
    commit<K extends keyof UserMutationsTypes>(
        key: K,
        payload: Parameters<UserMutationsTypes[K]>[1]
    ): ReturnType<UserMutationsTypes[K]>;
} & Omit<ActionContext<UserStateTypes, IRootState>, "commit">;

export interface UserActionsTypes {
    [UserATypes.GET_USER]({ commit }: AugmentedActionContextUser): Promise<any>;
}
