import { ActionTree } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { IRootState } from "@/store/register";
import { AuthActionsTypes, AuthStateTypes } from "@/store/store_interfaces/auth_store_interface";
import { User } from "@/interfaces/User";
import Swal from "sweetalert2";
import axios, { AxiosError } from "axios";

export const actions: ActionTree<AuthStateTypes, IRootState> & AuthActionsTypes = {
    async [ActionTypes.LOGIN]({ commit }, payload: { email: string, password: string }) {
        try {
            commit(MutationTypes.SET_LOADING, true);
            const response = await axios.post('/api/auth/login', {
                email: payload.email,
                password: payload.password,
                device_name: navigator.userAgent,
            });
            commit(MutationTypes.SET_LOADING, false);
            commit(MutationTypes.SET_USER, response.data['user']);
            commit(MutationTypes.SET_TOKEN, response.data['token']);
            commit(MutationTypes.SET_LOGIN_STATE, true);
        } catch (err: any | Error | AxiosError) {
            commit(MutationTypes.SET_LOADING, false);
            console.log(err.response.data);
        }
    },
    async [ActionTypes.REGISTER]({ commit }, payload: { name: string, email: string, password: string, password_confirmation: string, phone_number: string }) {
        try {
            commit(MutationTypes.SET_LOADING, true);
            const response = await axios.post('/api/auth/register', payload);
            commit(MutationTypes.SET_USER, response.data['user']);
            commit(MutationTypes.SET_TOKEN, response.data['token']);
            commit(MutationTypes.SET_LOADING, false);
            commit(MutationTypes.SET_LOGIN_STATE, true);
        } catch (errors) {
            commit(MutationTypes.SET_LOADING, false);
            console.log(errors);
        }
    },
    async [ActionTypes.LOGOUT]({ commit }) {
        try {
            // TODO: add default Authorization:Bearer ${token} when the app is mounted and user has already logged in
            commit(MutationTypes.SET_LOADING, true);
            const response = await axios.get('/api/auth/logout');
            commit(MutationTypes.SET_LOADING, false);
            commit(MutationTypes.SET_USER, null);
            commit(MutationTypes.SET_TOKEN, null);
            commit(MutationTypes.SET_LOGIN_STATE, false);
            console.log(response.data);
        } catch (errors) {
            commit(MutationTypes.SET_LOADING, false);
            console.log(errors);
        }
    },
};
