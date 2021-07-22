import { ActionContext } from "vuex";
import { IRootState } from "../register";
/******************* [Auth]*********************/
import { MutationTypes as AuthMTypes } from "../modules/auth/mutation-types";
import { ActionTypes as AuthATypes } from "../modules/auth/action-types";
/*********************** Auth MODULE TYPES  ***********************/
export interface AuthStateTypes {
    token: string | null;
    isLoggedIn: boolean;
    isLoading: boolean;
}

export interface AuthGettersTypes {
    isLoading(state: AuthStateTypes): boolean;
    getToken(state: AuthStateTypes): string | null;
    isUserLoggedIn(state: AuthStateTypes): boolean;
}

export type AuthMutationsTypes<S = AuthStateTypes> = {
    [AuthMTypes.SET_LOADING](state: S, payload: boolean): void;
    [AuthMTypes.SET_LOGIN_STATE](state: S, payload: boolean): void;
    [AuthMTypes.SET_TOKEN](state: S, payload: string | null): void;
};

export type AugmentedActionContextAuth = {
    commit<K extends keyof AuthMutationsTypes>(
        key: K,
        payload: Parameters<AuthMutationsTypes[K]>[1]
    ): ReturnType<AuthMutationsTypes[K]>;
} & Omit<ActionContext<AuthStateTypes, IRootState>, "commit">;

export interface AuthActionsTypes {
    [AuthATypes.LOGIN](
        { commit }: AugmentedActionContextAuth,
        payload: {
            email: string;
            password: string;
        }
    ): Promise<any>;
    [AuthATypes.REGISTER](
        { commit }: AugmentedActionContextAuth,
        payload: {
            name: string;
            email: string;
            password: string;
            password_confirmation: string;
            phone?: string;
        }
    ): Promise<any>;

    [AuthATypes.LOGOUT]({ commit }: AugmentedActionContextAuth): Promise<any>;
}
