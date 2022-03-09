import { ADD_PLAYER_INFOS, ADD_TOKEN } from './actionTypes';

export const addPlayerInfos = (payload) => ({
  type: ADD_PLAYER_INFOS,
  payload,
});

export const addToken = (payload) => ({
  type: ADD_TOKEN,
  payload,
});
