import { TTask } from "./DTOs";

export type TCatalog = {
    projectId: string;
    name: string;
    tasks: TTask[];
}

export type TWorklog = {
    devideId: string;
    mode: string;
    projectId: string;
    taskId: string;
    time: number;
    userId: string;
    hours: number;
    timeString: string;
    start: string;
    end: string;
    projectName: string;
    taskName: string;
}