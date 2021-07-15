import { Module, ModuleTree } from "vuex";
import { IRootState } from "@/store/interfaces";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";
import dailyTask from "../daily_task";
import upcomingTask from '../upcoming_task';

// Modules
const modules: ModuleTree<IRootState> = {
  dailyTask,
  upcomingTask,
};

const root: Module<IRootState, IRootState> = {
  state,
  getters,
  mutations,
  actions,
  modules
};

export default root;
