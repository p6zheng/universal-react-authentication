import * as actionTypes from '../constants/actionTypes';
import { combineReducers } from 'redux';

const errorMessage = (state={}, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_SUCCESS:
    case actionTypes.UNMOUNT_COMPONENT:
      return {};
    case actionTypes.SIGNUP_ERROR:
      return {
        signup: action.error
      };
    case actionTypes.SIGNIN_ERROR:
      return {
        signin: action.error
      };
    default:
      return state;
  }
};

const isAuthenticating = (state=false, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_REQUEST:
      return true;
    case actionTypes.AUTH_USER_SUCCESS:
    case actionTypes.SIGNUP_ERROR:
      return false;
    default:
      return state;
  }
};

const isAuthenticated = (state=false, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_SUCCESS:
      return true;
    case actionTypes.UNAUTH_USER:
      return false;
    default:
      return state;
  }
};

const auth = combineReducers({
  errorMessage,
  isAuthenticating,
  isAuthenticated
});

export default auth;

export const getIsAuthenticating = state => state.isAuthenticating;
export const getIsAuthenticated = state => state.isAuthenticated;
export const getSigninError = state => state.errorMessage.signin;
export const getSignupError = state => state.errorMessage.signup;
