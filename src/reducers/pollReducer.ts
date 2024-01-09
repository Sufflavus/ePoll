import { UnknownAction } from 'redux';
import { 
    AddPollAction, AddPollVoteAction, LoadAllPollsAction, LoadPollAction, 
    ADD_POLL, ADD_POLL_VOTE, LOAD_ALL_POLLS, LOAD_POLL
} from '../actions';
import { pollInitialState } from './state';

const pollReducer = (
        state = pollInitialState, 
        action: AddPollAction | AddPollVoteAction | LoadAllPollsAction | LoadPollAction | UnknownAction
    ) => {
    switch (action.type) {
        case LOAD_ALL_POLLS:
            return {
                ...state,
                status: action.status,
                entities: (action as LoadAllPollsAction).result || state.entities
            };
    
        case LOAD_POLL:
            const loadPollAction = action as LoadPollAction;
            const loadedPollId = loadPollAction.payload;
            const loadedPoll = loadPollAction.result;
            const existingPoll = state.entities.find(poll => poll.id === loadedPollId);

            return {
                ...state,
                entities:
                    existingPoll ?
                    state.entities.map(poll => poll.id === loadedPollId ? 
                        { ...(loadedPoll || poll), userData: { status: loadPollAction.status } } :  
                        poll
                    ) :
                    [...state.entities, { ...loadedPoll, userData: { status: loadPollAction.status } }]
            };

        case ADD_POLL:
            const addPollAction = action as AddPollAction;
            const newPoll = addPollAction.result;

            if(!newPoll) {
                return state;
            }

            return {
                ...state,
                entities: [
                    ...state.entities, {
                        ...newPoll, 
                        userData: { status: addPollAction.status }
                    }
                ]
            };

        case ADD_POLL_VOTE:
            const addVoteAction = action as AddPollVoteAction;
            const { pollId } = addVoteAction.payload;
            const updatedPoll = addVoteAction.result;
            const oldPoll = state.entities.find(poll => poll.id === pollId);

            return {
                ...state,
                entities:
                oldPoll ?
                    state.entities.map(poll => poll.id === pollId ? 
                        { ...(updatedPoll || poll), userData: { status: addVoteAction.status } } :  
                        poll
                    ) :
                    [...state.entities, { ...updatedPoll, userData: { status: addVoteAction.status } }]
            };

        default:
            return state;
    }
};

export default pollReducer;