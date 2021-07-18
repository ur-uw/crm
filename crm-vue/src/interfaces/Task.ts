import { Status } from "./Status";
export interface Task {
    id?: number;
    title?: string;
    status_id?: number;
    status?: Status;
    slug?: string;
    description?: string;
    start_date?: Date | string;
    due_date?: Date | string;
    created_at?: Date | string;
    updated_at?: Date | string;
}
