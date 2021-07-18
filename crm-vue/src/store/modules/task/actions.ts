import { Task } from "@/interfaces/Task";
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import Swal from "sweetalert2";
import { TaskActionsTypes, TaskStateTypes, IRootState } from "@/store/interfaces";
import axios, { AxiosError } from "axios";

export const actions: ActionTree<TaskStateTypes, IRootState> & TaskActionsTypes = {
    // FETCH TASKS
    async [ActionTypes.FETCH_TASKS]({ commit }) {
        try {
            commit(MutationTypes.SET_LOADING, true);
            const res = await axios.get("/api/task");
            commit(MutationTypes.SET_LOADING, false);
            commit(MutationTypes.SET_ITEMS, res.data["data"]);
        } catch (e) {
            console.log(e);
            commit(MutationTypes.SET_LOADING, false);
        }
    },
    // CREATE TASK
    async [ActionTypes.CREATE_TASK]({ commit }, task: Task) {
        try {
            const response = await axios.post("/api/task/", task);
            const newTask: Task = response.data["data"];
            commit(MutationTypes.ADD_ITEM, newTask);
        } catch (err: Error | AxiosError | unknown) {
            if (axios.isAxiosError(err)) {
                // Access to config, request, and response
                console.log(err.response?.data);
            } else {
                // Just a stock error
                console.error(err);
            }
        }
    },
    // EDIT TASK
    async [ActionTypes.EDIT_TASK]({ commit }, updatedTask: Task) {
        try {
            const response = await axios.put(`/api/task/${updatedTask.id}`, updatedTask);
            commit(MutationTypes.SET_ITEM, response.data["data"]);
        } catch (error) {
            console.log("EDIT_TASK action" + error);
        }
    },
    // CHANGE TASK STATUS
    async [ActionTypes.CHANGE_STATUS]({ commit }, payload: { id: number; status_slug: string }) {
        try {
            const response = await axios.put(`/api/task/changestatus/${payload.id}`, {
                status_slug: payload.status_slug
            });
        } catch (error) {
            console.log("EDIT_TASK action" + error);
        }
    },
    // DELETE TASK
    async [ActionTypes.DELETE_TASK]({ commit }, id: number) {
        const confirmResult = await Swal.fire({
            titleText: "Delete Task",
            text: "Are you sure you want to delete this task?",
            allowOutsideClick: false,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        });
        if (confirmResult.isConfirmed) {
            try {
                await axios.delete(`/api/task/${id}`);
                commit(MutationTypes.DELETE_TASK, id);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    toast: true,
                    titleText: "Some went thing wrong",
                    showConfirmButton: false
                });
                console.error("DELETE_TASK_ACTION", error);
            }
        }
    }
};
