import { ADD_PLAYER_INFOS } from '../actions/actionTypes';

const initialState = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const player = (state = initialState, { type, payload }) => {
  switch (type) {
  case ADD_PLAYER_INFOS:
    return { ...state, ...payload };

  default:
    return state;
  }
};

export default player;
