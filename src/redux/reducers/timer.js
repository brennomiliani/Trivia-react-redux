import {
  ADD_TIMER,
  ANSWER_DISABLED,
  SET_FINAL_TIMER,
} from '../actions/actionTypes';

const initialState = {
  seconds: 30,
  answersAreDisabled: false,
  finalSeconds: 30,
};

const timer = (state = initialState, { type, payload }) => {
  switch (type) {
  case ADD_TIMER:
    return { ...state, seconds: payload };

  case ANSWER_DISABLED:
    return { ...state, answersAreDisabled: payload };

  case SET_FINAL_TIMER:
    return { ...state, finalSeconds: payload };

  default:
    return state;
  }
};

export default timer;
