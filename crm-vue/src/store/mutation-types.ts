import { MutationTypes as dailyTaskTypes } from "./modules/daily_task/mutation-types";
import { MutationTypes as upcomingTaskTypes } from "./modules/upcoming_task/mutation-types";

export const AllMutationTypes = { ...dailyTaskTypes, ...upcomingTaskTypes };
