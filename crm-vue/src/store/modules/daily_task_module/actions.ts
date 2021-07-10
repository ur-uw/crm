import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import axios from "axios";

export enum DailyTaskActionTypes {
  GetDailyTasks = "GET_ITEMS",
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [DailyTaskActionTypes.GetDailyTasks](context: ActionAugments): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async [DailyTaskActionTypes.GetDailyTasks]({ commit }) {
    try {
      commit(MutationType.SetLoading, true);
      const res = await axios.get("/api/dailytask");
      commit(MutationType.SetLoading, false);
      commit(MutationType.SetItems, res.data["data"]);
    } catch (e) {
      console.log(e);
      commit(MutationType.SetLoading, false);
    }
  },
};
