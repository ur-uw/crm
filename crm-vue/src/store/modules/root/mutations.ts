import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { IRootState, IUserData } from "@/store/register";
import { RootMutationsTypes } from "@/store/store_interfaces/root_store_interface";

export const mutations: MutationTree<IRootState> & RootMutationsTypes = {
  [MutationTypes.UPDATE_VERSION](state: IRootState, payload: string) {
    state.version = payload;
  },
  [MutationTypes.USER_LISTS](state, payload: IUserData[]) {
    state.userlists = payload;
  },
};
