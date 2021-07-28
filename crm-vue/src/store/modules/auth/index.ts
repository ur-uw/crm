import { AuthStateTypes } from "@/store/store_interfaces/auth_store_interface";
import { Module } from "vuex";
import { IRootState } from "@/store/register";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";

// Module
const auth: Module<AuthStateTypes, IRootState> = {
    state,
    getters,
    mutations,
    actions
};

export default auth;
