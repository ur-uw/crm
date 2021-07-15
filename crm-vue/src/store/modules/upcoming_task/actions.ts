import { UpcomingTask } from '@/interfaces/Task';
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import Swal from "sweetalert2";
import {
  UpcomingTaskActionsTypes,
  UpcomingTaskStateTypes,
  IRootState
} from "@/store/interfaces";
import axios from 'axios';

export const actions: ActionTree<UpcomingTaskStateTypes, IRootState> &
  UpcomingTaskActionsTypes = {
  // FETCH TASKS
  async [ActionTypes.FETCH_UPCOMING_TASKS]({ commit }) {
    try {
      commit(MutationTypes.SET_UPCOMING_LOADING, true);
      const res = await axios.get("/api/upcoming");
      commit(MutationTypes.SET_UPCOMING_LOADING, false);
      commit(MutationTypes.SET_UPCOMING_ITEMS, res.data["data"]);
    } catch (e) {
      console.log(e);
      commit(MutationTypes.SET_UPCOMING_LOADING, false);
    }
  },
  // CREATE TASK
  async [ActionTypes.CREATE_UPCOMING_TASK]({ commit }, task: UpcomingTask) {
    try {
      const response = await axios.post('/api/upcoming/', task);
      const newTask: UpcomingTask = response.data['data'];
      commit(MutationTypes.ADD_UPCOMING_TASK, newTask);
    } catch (error) {
      console.error('CREATE_TASK_UPCOMING_ACTION', error);
    }
  },
  // EDIT TASK
  async [ActionTypes.EDIT_UPCOMING_TASK]({ commit }, newTask: { data: UpcomingTask, taskId: string }) {
    try {
      await axios.put(`/api/upcoming/${newTask.taskId}`, newTask.data);
      commit(MutationTypes.SET_UPCOMING_ITEM, newTask);
    } catch (error) {
      console.log('EDIT_TASK action' + error);
    }
  },
  // DELETE TASK
  async [ActionTypes.DELETE_UPCOMING_TASK]({ commit }, taskId: string) {
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
        await axios.delete(`/api/upcoming/${taskId}`);
        commit(MutationTypes.DELETE_UPCOMING_TASK, taskId);
      } catch (error) {
        Swal.fire({
          icon: "error",
          toast: true,
          titleText: "Some went thing wrong",
          showConfirmButton: false,
        });
        console.error('DELETE_TASK_ACTION', error);
      }
    }
  },
};
