import { User } from "./User";
import { Task } from "./Task";
export interface Project {
    id: number;
    name: string;
    description?: string;
    slug: string;
    tasks?: Task[];
    users?: User[];
    created_at?: string | Date;
    updated_at?: string | Date;
}
