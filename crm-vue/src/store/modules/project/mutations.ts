import { MutationTree } from "vuex";
import { MutationTypes } from "./mutation-types";
import { Project } from "@/interfaces/Project";
import {
    ProjectMutationsTypes,
    ProjectStateTypes
} from "@/store/store_interfaces/project_store_interface";
import { sortByUpdatedAt } from "@/utils/helpers";
export const mutations: MutationTree<ProjectStateTypes> & ProjectMutationsTypes = {
    [MutationTypes.SET_PROJECTS](state: ProjectStateTypes, data: Project[]): void {
        state.projects = data;
    },
    [MutationTypes.UPDATE_PROJECT](
        state: ProjectStateTypes,
        payload: { index: number; updatedProject: Project }
    ): void {
        if (state.projects !== null) {
            state.projects[payload.index] = payload.updatedProject;
            state.projects.sort(sortByUpdatedAt);
        }
    },
    [MutationTypes.DELETE_PROJECT](state: ProjectStateTypes, id: number): void {
        if (state.projects != null) {
            state.projects = state.projects?.filter((p) => p.id !== id);
        }
    },
    [MutationTypes.ADD_PROJECT](state: ProjectStateTypes, project: Project): void {
        if (state.projects != null) {
            state.projects.unshift(project);
        }
    },
    [MutationTypes.SET_LOADING](state: ProjectStateTypes, value: boolean): void {
        state.isLoading = value;
    }
};
