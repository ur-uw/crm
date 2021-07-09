interface Task {
  id?: number | string;
  title?: string;
  completed?: boolean | number;
  approved?: boolean | number;
  taskId?: string | undefined;
  created_at?: string | null;
  updated_at?: string | null;
}

export type DailyTask = Task;

export interface UpComingTask extends Task {
  waiting?: boolean | number;
}
