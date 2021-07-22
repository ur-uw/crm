import { User } from "@/interfaces/User";
import { UserMutationsTypes, UserStateTypes } from "@/store/store_interfaces/user_store_interface";
import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";

export const mutations: MutationTree<UserStateTypes> & UserMutationsTypes = {
    [MutationTypes.SET_LOADING](state: UserStateTypes, payload: boolean): void {
        state.isLoading = payload;
    },
    [MutationTypes.SET_USER](state: UserStateTypes, payload: User): void {
        state.user = payload;
    }
};
