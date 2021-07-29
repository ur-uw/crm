import { Module } from "vuex";
import { IRootState } from "@/store/register";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";
import { ProjectStateTypes } from "@/store/store_interfaces/project_store_interface";

// Module
const project: Module<ProjectStateTypes, IRootState> = {
    state,
    getters,
    mutations,
    actions
};

export default project;
