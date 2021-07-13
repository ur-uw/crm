import { DailyTask } from './../../../interfaces/Task';
import { ActionTree } from "vuex";
import { ActionTypes } from "./action-types";
import { MutationTypes } from "./mutation-types";
import {
  DailyTaskActionsTypes,
  DailyTaskStateTypes,
  IRootState
} from "@/store/interfaces";
import axios from 'axios';

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
  async [ActionTypes.EDIT_TASK]({ commit }, data: { newTaskData: DailyTask, taskId: string }) {
    try {
      await axios.put(`/api/dailytask/${data.taskId}`, data.newTaskData);
      commit(MutationTypes.COMPLETE_TASK, data.taskId);
    } catch (error) {

    }
  },
  async [ActionTypes.DELETE_TASK]({ commit }, taskId: string) {
    if (confirm("Are you sure?")) {
      try {
        commit(MutationTypes.SET_LOADING, true);
        await axios.delete(`/api/dailytask/${taskId}`);
        commit(MutationTypes.DELETE_TASK, taskId);
        commit(MutationTypes.SET_LOADING, false);
      } catch (error) {
        console.error('DELETE_TASK_ACTION', error);
      }
    }
  },
};