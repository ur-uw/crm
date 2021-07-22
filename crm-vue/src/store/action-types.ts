import { ActionTypes as TaskActionTypes } from "./modules/task/action-types";
import { ActionTypes as AuthActionTypes } from "./modules/auth/action-types";
import { ActionTypes as rootATypes } from "./modules/root/action-types";

export const AllActionTypes = {
  ...AuthActionTypes,
  ...TaskActionTypes,
  ...rootATypes
};
