import { ActionTree } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { IRootState } from "@/store/register";
import { AuthActionsTypes, AuthStateTypes } from "@/store/store_interfaces/auth_store_interface";
import { User } from "@/interfaces/User";
import Swal from "sweetalert2";
import axios from "axios";
import { handleApi } from "@/utils/helpers";

export const actions: ActionTree<AuthStateTypes, IRootState> & AuthActionsTypes = {
    [ActionTypes.LOGIN]({ commit }, payload: { email: string; password: string }): Promise<any> {
        return new Promise(async (resolve, reject) => {
            commit(MutationTypes.SET_LOADING, true);
            const promise = axios.post("/api/auth/login", {
                ...payload,
                device_name: navigator.userAgent
            });
            const [data, error] = await handleApi(promise);
            if (error) {
                commit(MutationTypes.SET_LOADING, false);
                localStorage.removeItem("token");
                commit(MutationTypes.SET_USER, null);
                commit(MutationTypes.SET_TOKEN, null);
                reject(error);
                return;
            }
            const token = data.data['token'];
            localStorage.setItem('token', token);
            commit(MutationTypes.SET_LOADING, false);
            commit(MutationTypes.SET_USER, data.data["user"]);
            commit(MutationTypes.SET_TOKEN, token);
            commit(MutationTypes.SET_LOGIN_STATE, true);
            resolve(data);
        });
    },
    async [ActionTypes.REGISTER](
        { commit },
        payload: {
            name: string;
            email: string;
            password: string;
            password_confirmation: string;
            phone_number: string;
        }
    ) {
        return new Promise(async (resolve, reject) => {
            commit(MutationTypes.SET_LOADING, true);
            const promise = axios.post("/api/auth/register", {
                ...payload,
                device_name: navigator.userAgent
            });
            const [data, error] = await handleApi(promise);
            if (error) {
                commit(MutationTypes.SET_LOADING, false);
                localStorage.removeItem("token");
                commit(MutationTypes.SET_USER, null);
                commit(MutationTypes.SET_TOKEN, null);
                reject(error);
                return;
            }
            commit(MutationTypes.SET_LOADING, false);
            commit(MutationTypes.SET_USER, data["user"]);
            commit(MutationTypes.SET_TOKEN, data["token"]);
            commit(MutationTypes.SET_LOGIN_STATE, true);
            resolve(data);
        });
    },
    async [ActionTypes.LOGOUT]({ commit }) {
        try {
            // TODO: add default Authorization:Bearer ${token} when the app is mounted and user has already logged in
            commit(MutationTypes.SET_LOADING, true);
            const response = await axios.get("/api/auth/logout");
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
    [ActionTypes.GET_USER]({ commit }): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const response = axios.get('/api/auth/user');
            const [data, error] = await handleApi(response);
            if (error) {
                reject(error);
                return;
            }
            commit(MutationTypes.SET_USER, data.data['user']);
            resolve(data);

        });
    }
};
