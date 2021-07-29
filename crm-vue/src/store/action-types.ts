import { ActionTypes as taskActionTypes } from "./modules/task/action-types";
import { ActionTypes as authActionTypes } from "./modules/auth/action-types";
import { ActionTypes as projectActionTypes } from "./modules/project/action-types";
import { ActionTypes as rootATypes } from "./modules/root/action-types";

export const AllActionTypes = {
    ...authActionTypes,
    ...projectActionTypes,
    ...taskActionTypes,
    ...rootATypes
};
