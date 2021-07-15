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
  // FETCH TASKS
  async [ActionTypes.FETCH_DAILY_TASKS]({ commit }) {
    try {
      commit(MutationTypes.SET_DAILY_LOADING, true);
      const res = await axios.get("/api/dailytask");
      commit(MutationTypes.SET_DAILY_LOADING, false);
      commit(MutationTypes.SET_DAILY_ITEMS, res.data["data"]);
    } catch (e) {
      console.log(e);
      commit(MutationTypes.SET_DAILY_LOADING, false);
    }
  },
  // CREATE TASK
  async [ActionTypes.CREATE_DAILY_TASK]({ commit }, task: DailyTask) {
    try {
      const response = await axios.post('/api/dailytask/', task);
      const newTask: DailyTask = response.data['data'];
      commit(MutationTypes.ADD_DAILY_ITEM, newTask);
    } catch (error) {
      console.error('CREATE_TASK_ACTION', error);
    }
  },
  // EDIT TASK
  async [ActionTypes.EDIT_DAILY_TASK]({ commit }, newTask: { data: DailyTask, taskId: string }) {
    try {
      await axios.put(`/api/dailytask/${newTask.taskId}`, newTask.data);
      commit(MutationTypes.SET_DAILY_ITEM, newTask);
    } catch (error) {
      console.log('EDIT_TASK action' + error);
    }
  },
  // DELETE TASK
  async [ActionTypes.DELETE_DAILY_TASK]({ commit }, taskId: string) {
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
        await axios.delete(`/api/dailytask/${taskId}`);
        commit(MutationTypes.DELETE_DAILY_TASK, taskId);
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
