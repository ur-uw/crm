import { DailyTask } from "@/interfaces/Task";

export type State = {
  loading: boolean;
  items: DailyTask[];
};

export const state: State = {
  loading: false,
  items: [],
};
