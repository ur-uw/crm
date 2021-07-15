import { DailyTask } from '@/interfaces/Task';
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import Swal from "sweetalert2";
import {
  DailyTaskActionsTypes,
  DailyTaskStateTypes,
  IRootState
} from "@/store/interfaces";
import axios from 'axios';
import VueSweetalert2 from 'vue-sweetalert2';

export const actions: ActionTree<DailyTaskStateTypes, IRootState> &
  DailyTaskActionsTypes = {

  async [ActionTypes.FETCH_TASKS]({ commit }) {
    try {
      commit(MutationTypes.SET_LOADING, true);
      const res = await axios.get("/api/dailytask");
      commit(MutationTypes.SET_LOADING, false);
      commit(MutationTypes.SET_ITEMS, res.data["data"]);
    } catch (e) {
      console.log(e);
      commit(MutationTypes.SET_LOADING, false);
    }
  },
  async [ActionTypes.CREATE_TASK]({ commit }, task: DailyTask) {
    try {
      commit(MutationTypes.SET_LOADING, true);
      await axios.post('/api/dailytask/', task);
      commit(MutationTypes.SET_LOADING, false);
    } catch (error) {
      console.error('CREATE_TASK_ACTION', error);
    }
  },
  async [ActionTypes.EDIT_TASK]({ commit }, newTask: { data: DailyTask, taskId: string }) {
    try {
      await axios.put(`/api/dailytask/${newTask.taskId}`, newTask.data);
      commit(MutationTypes.SET_ITEM, newTask);
    } catch (error) {
      console.log('EDIT_TASK action' + error);
    }
  },
  async [ActionTypes.DELETE_TASK]({ commit }, taskId: string) {
    const confirmResult = await Swal.fire({
      titleText: "Delete DailyTask",
      text: "Are you sure you want to delete this task?",
      allowOutsideClick: false,
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    });
    if (confirmResult.isConfirmed) {
      try {
        await axios.delete(`/api/dailytask/${taskId}`);
        commit(MutationTypes.DELETE_TASK, taskId);
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
