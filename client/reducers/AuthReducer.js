import * as actionTypes from '../constants/actionTypes';

const inititalState = {};

const auth = (state=inititalState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER:
      return {
        isAuthenticated: true,
        error: ''
      };
    case actionTypes.UNAUTH_USER:
      return {
        isAuthenticated: false
      };
    case actionTypes.FETCH_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case actionTypes.AUTH_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
}

export default auth;

export const getIsAuthenticated = (state) => state.isAuthenticated;
export const getError = (state) => state.error;
export const getMessage = (state) => state.message;