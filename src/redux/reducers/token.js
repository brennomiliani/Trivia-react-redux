import { ADD_TOKEN } from '../actions/actionTypes';

const initialState = {
  token: '',
};

const token = (state = initialState, { type, payload }) => {
  switch (type) {
  case ADD_TOKEN:
    return { ...state, ...payload };

  default:
    return state;
  }
};

export default token;
