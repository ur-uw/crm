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
  async [ActionTypes.EDIT_TASK]({ commit }, data: { newData: DailyTask, taskId: string }) {
    // TODO: IMPLEMENT EDIT TASK ACTION
  },
  async [ActionTypes.DELETE_TASK]({ commit }, taskId: string) {
    try {
      commit(MutationTypes.SET_LOADING, true);
      await axios.delete('/api/dailytask/', { data: { taskId: taskId } });
      commit(MutationTypes.SET_LOADING, false);
    } catch (error) {
      console.error('DELETE_TASK_ACTION', error);
    }
  },
};
