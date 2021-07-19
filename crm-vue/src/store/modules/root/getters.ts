import { IRootGettersTypes } from "@/store/store_interfaces/root_store_interface";
import { GetterTree } from "vuex";
import { IRootState, IUserData } from "@/store/register";

export const getters: GetterTree<IRootState, IRootState> & IRootGettersTypes = {
  getVersion: (state: IRootState): string => {
    return state.version;
  },
  getUserList: (state: IRootState): IUserData[] => {
    return state.userlists;
  },
};
