export const enum EntityStatus {
    Init = 1,
    Pending = 2,
    Succeeded = 3,
    Failed = 4
}

export interface EntityUserData {
    status: EntityStatus;
}

export interface Poll {
    id: number;
    title: string;
    options: PollOption[];
    userData: EntityUserData;
}

export interface PollOption {
    id: number;
    pollId: number;
    title: string;
    votes: number;
}

export const DefaultPoll: Poll = {
    id: 0,
    title: '',
    options: [],
    userData: { status: EntityStatus.Init }
};

export const DefaultPollOption: PollOption = {
    id: 0,
    pollId: 0,
    title: '',
    votes: 0
};
