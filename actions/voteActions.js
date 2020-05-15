import * as types from '../constants/ActionTypes';

export const voteUp = id => ({
  type: types.VOTE_UP,
  id
});

export const voteUpSuccess = () => ({
  type: types.VOTE_UP_SUCCESS
});

export const voteDown = id => ({
  type: types.VOTE_DOWN,
  id
});

export const voteDownSuccess = () => ({
  type: types.VOTE_DOWN_SUCCESS
});

export const voteSkip = id => ({
  type: types.VOTE_SKIP,
  id
});

export const voteSkipSuccess = () => ({
  type: types.VOTE_SKIP_SUCCESS
});
