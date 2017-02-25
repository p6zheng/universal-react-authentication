import * as actionTypes from '../constants/actionTypes';

const message = (state={}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGE_SUCCESS:
      return {
        data: action.message
      }
    default:
      return state;
  }
}

export default message;

export const getMessage = state => state.data;