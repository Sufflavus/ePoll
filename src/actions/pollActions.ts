import axios from 'axios';
import { Dispatch, UnknownAction } from 'redux';
import { ADD_POLL, ADD_POLL_VOTE, LOAD_ALL_POLLS, LOAD_POLL } from './pollActionTypes';
import { DefaultPoll, EntityStatus, Poll } from '../models';

const BASE_API_URL = "http://localhost:8081";

interface BaseAction extends UnknownAction {
    status: EntityStatus;
}

export interface LoadAllPollsAction extends BaseAction {
    result: Poll[];
}

export interface LoadPollAction extends BaseAction {
    payload: number;
    result: Poll | null;
}

export interface AddPollAction extends BaseAction {
    payload: Poll;
    result: Poll | null;
}

export interface AddPollVoteAction extends BaseAction {
    payload: {
        pollId: number;
        optionId: number;
    };
    result: Poll | null;
}

export const loadAllPolls = (dispatch: Dispatch<UnknownAction>) => {
    axios.get(`${BASE_API_URL}/polls`)
        .then(function (response) {
            dispatch({
                type: LOAD_ALL_POLLS,
                status: EntityStatus.Succeeded,
                result: (response.data.polls as any[]).map(poll => ({
                    ...DefaultPoll, 
                    id: poll.id, 
                    title: poll.title
                }))
            } as LoadAllPollsAction);
        })
        .catch(function (_error) {
            dispatch({
                type: LOAD_ALL_POLLS,
                status: EntityStatus.Failed,
                result: []
            } as LoadAllPollsAction);
        });
};

export const loadPoll = (pollId: number, dispatch: Dispatch<UnknownAction>) => {
    axios.get(`${BASE_API_URL}/polls/${pollId}`)
        .then(function (response) {
            const succeeded = !!response.data;

            dispatch({
                type: LOAD_POLL,
                status: succeeded ? EntityStatus.Succeeded : EntityStatus.Failed,
                payload: pollId,
                result: succeeded ? response.data as Poll : null
            } as LoadPollAction);
        })
        .catch(function (_error) {
            dispatch({
                type: LOAD_POLL,
                status: EntityStatus.Failed,
                payload: pollId,
                result: null
            } as LoadPollAction);
        }); 
};

export const addPoll = (poll: Poll, dispatch: Dispatch<UnknownAction>) => {
    axios.post(`${BASE_API_URL}/polls/add`, { 
        title: poll.title,
        options: poll.options.map(option => option.title) 
    })
        .then(function (response: any) {
            dispatch( {
                type: ADD_POLL,
                status: EntityStatus.Succeeded,
                payload: poll,
                result: response.data as Poll
            } as AddPollAction);
        })
        .catch(function (_error) {
            dispatch( {
                type: ADD_POLL,
                status: EntityStatus.Failed,
                payload: poll,
                result: null
            } as AddPollAction);
        });
};

export const addPollVote = (pollId: number, optionId: number, dispatch: Dispatch<UnknownAction>) => {
    axios.post(`${BASE_API_URL}/polls/${pollId}/vote/${optionId}`)
        .then(function (response: any) {
            dispatch( {
                type: ADD_POLL_VOTE,
                status: EntityStatus.Succeeded,
                payload: { pollId, optionId },
                result: response.data as Poll
            } as AddPollVoteAction);
        })
        .catch(function (_error) {
            dispatch( {
                type: ADD_POLL_VOTE,
                status: EntityStatus.Failed,
                payload: { pollId, optionId },
                result: null
            } as AddPollVoteAction);
        });
};
