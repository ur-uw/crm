import { DailyTask } from "@/interfaces/Task";
import { ActionContext, ActionTree } from "vuex";
import { Mutations, MutationType } from "./mutations";
import { State } from "./state";
import axios from "axios";

export enum ActionTypes {
  GetTodoItems = "GET_ITEMS",
}

type ActionAugments = Omit<ActionContext<State, State>, "commit"> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionTypes.GetTodoItems](context: ActionAugments): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async [ActionTypes.GetTodoItems]({ commit }) {
    commit(MutationType.SetLoading, true);
    try {
      const dailyTasks = (await axios.get("/api/dailytask")) as DailyTask[];
      commit(MutationType.SetLoading, false);
      commit(MutationType.SetItems, dailyTasks);
    } catch (error) {
      console.log(error);
    }
  },
};
