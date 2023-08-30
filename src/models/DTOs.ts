export type TLogin = {
    createdAt: Date;
    expiresAt: Date;
    token: string;
}

export type TProject = {
    creatorId: string;
    deleted: boolean;
    id: string;
    name: string;
    scope: string;
    weight: number;
}

export type TProjectsList = {
    data: TProject[];
    paging: {
        nItems: number;
    }
}

export type TTask = {
    assignedTo: any[];
    deleted: boolean;
    folders: any[];
    id: string;
    integration: {
        provider: string;
    };
    name: string;
    project: {
        id: string;
    };
    reporterId: string;
    status: "new"
}

export type TTasksList = {
    data: TTask[];
    paging: {
        cur: number;
        limit: number;
        nItems: number;
        next?: number;
        totalCount: number;
    }
}

//ERROR TYPES
export type TError = {
    detail?: string;
    error: string;
    message: string;
    thrown: string;
}