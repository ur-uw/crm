import { ActionTypes as DailyTaskActionTypes } from "./modules/task/action-types";
import { ActionTypes as rootATypes } from "./modules/root/action-types";

export const AllActionTypes = {
  ...DailyTaskActionTypes,
  ...rootATypes
};
