interface Task {
  id: number;
  title: string;
  completed: boolean;
  approved: boolean;
  taskId: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface DailyTask extends Task {
  id: number;
  title: string;
  completed: boolean;
  approved: boolean;
  taskId: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface UpComingTask extends Task {
  id: number;
  title: string;
  completed: boolean;
  approved: boolean;
  waiting: boolean;
  taskId: string;
  created_at: string | null;
  updated_at: string | null;
}
