import { EntityStatus, Poll } from '../models';

export interface PollState {
    status: EntityStatus;
    entities: Poll[];
}
  
export const pollInitialState: PollState = {
    status: EntityStatus.Init,
    entities: []
};
