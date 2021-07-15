
export interface Task {
  id?: number | string;
  title?: string;
  status?: "waiting" | "approved" | "inprogress" | "completed" | "denied";
  taskId?: string;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface DailyTask extends Task {
  status?: "inprogress" | "completed";
};

export type UpComingTask = Task;