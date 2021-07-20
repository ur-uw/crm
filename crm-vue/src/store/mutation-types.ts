import { MutationTypes as taskTypes } from "./modules/task/mutation-types";
import { MutationTypes as authTypes } from "./modules/auth/mutation-types";

export const AllMutationTypes = { ...taskTypes, ...authTypes };
