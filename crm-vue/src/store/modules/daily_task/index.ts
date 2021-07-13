import { Module } from "vuex";
import { DailyTaskStateTypes, IRootState } from "@/store/interfaces";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";

// Module
const dailyTask: Module<DailyTaskStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions
};

export default dailyTask;
