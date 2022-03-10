import { ADD_TOKEN } from '../actions/actionTypes';

const initialState = {};

const token = (state = initialState, { type, payload }) => {
  switch (type) {
  case ADD_TOKEN:
    return payload.token;

  default:
    return state;
  }
};

export default token;
