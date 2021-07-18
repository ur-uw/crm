import { Module } from "vuex";
import { TaskStateTypes, IRootState } from "@/store/interfaces";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";

// Module
const task: Module<TaskStateTypes, IRootState> = {
  state,
  getters,
  mutations,
  actions
};

export default task;
