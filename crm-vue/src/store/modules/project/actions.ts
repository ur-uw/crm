/* eslint-disable no-async-promise-executor */
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import { IRootState } from "@/store/register";
import {
    ProjectActionsTypes,
    ProjectStateTypes
} from "@/store/store_interfaces/project_store_interface";
import axios from "axios";
import { handleApi } from "@/utils/helpers";
import { Project } from "@/interfaces/Project";

export const actions: ActionTree<ProjectStateTypes, IRootState> & ProjectActionsTypes = {
    // FETCH ALL PROJECTS
    [ActionTypes.FETCH_PROJECTS]({ commit }): Promise<unknown> {
        return new Promise(async (resolve, reject): Promise<void> => {
            commit(MutationTypes.SET_LOADING, true);
            const promise = axios.get("/api/projects");
            const [data, error] = await handleApi(promise);
            if (error) {
                commit(MutationTypes.SET_LOADING, false);
                reject(error);
                return;
            }
            commit(MutationTypes.SET_LOADING, false);
            commit(MutationTypes.SET_PROJECTS, data.data["data"]);
            resolve(data);
        });
    },
    // FETCH SINGLE PROJECT
    [ActionTypes.FETCH_SINGLE_PROJECT]({ commit }, payload: Project): Promise<unknown> {
        return new Promise(async (resolve, reject): Promise<void> => {
            commit(MutationTypes.SET_LOADING, true);
            const promise = axios.get(`/api/project/show/${payload}`);
            const [data, error] = await handleApi(promise);
            if (error) {
                commit(MutationTypes.SET_LOADING, false);
                reject(error);
                return;
            }
            commit(MutationTypes.SET_LOADING, false);
            // TODO: Make use of the fetched project
            resolve(data);
        });
    },
    // CREATE PROJECT
    [ActionTypes.CREATE_PROJECT]({ commit }, project: Project): Promise<unknown> {
        return new Promise(async (resolve, reject): Promise<void> => {
            const promise = axios.post(`/api/project/create`, project);
            const [data, error] = await handleApi(promise);
            if (error) {
                reject(error);
                return;
            }
            commit(MutationTypes.ADD_PROJECT, project);
            resolve(data);
        });
    },
    // UPDATE A PROJECT
    [ActionTypes.UPDATE_PROJECT](
        { commit },
        payload: { index: number; updatedProject: Project }
    ): Promise<unknown> {
        return new Promise(async (resolve, reject) => {
            const response = axios.put(
                `/api/project/update/${payload.updatedProject.id}`,
                payload.updatedProject
            );
            const [data, error] = await handleApi(response);
            if (error) {
                reject(error);
                return;
            }
            commit(MutationTypes.UPDATE_PROJECT, {
                index: payload.index,
                updatedProject: data.data["data"]
            });
            resolve(data);
        });
    },
    // UPDATE A PROJECT
    [ActionTypes.DELETE_PROJECT]({ commit }, id: number): Promise<unknown> {
        return new Promise(async (resolve, reject) => {
            const response = axios.delete(`/api/project/delete/${id}`);
            const [, error] = await handleApi(response);
            if (error) {
                reject(error);
                return;
            }
            commit(MutationTypes.DELETE_PROJECT, id);
            resolve(null);
        });
    }
};
