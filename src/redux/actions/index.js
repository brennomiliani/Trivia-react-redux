import {
  ADD_PLAYER_INFOS,
  ADD_TOKEN,
  ADD_TIMER,
  ANSWER_DISABLED,
  SET_FINAL_TIMER,
} from './actionTypes';

export const addPlayerInfos = (payload) => ({
  type: ADD_PLAYER_INFOS,
  payload,
});

export const addToken = (payload) => ({
  type: ADD_TOKEN,
  payload,
});

export const addTimer = (payload) => ({
  type: ADD_TIMER,
  payload,
});

export const buttonDisabled = (payload) => ({
  type: ANSWER_DISABLED,
  payload,
});

export const finalTimer = (payload) => ({
  type: SET_FINAL_TIMER,
  payload,
});
