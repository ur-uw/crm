import { Module } from "vuex";
import { UpcomingTaskStateTypes, IRootState } from "@/store/interfaces";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";

// Module
const upcomingTask: Module<UpcomingTaskStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions
};

export default upcomingTask;
