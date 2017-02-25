import { combineReducers } from 'redux';
import auth, * as authReducer from './AuthReducer';
import user, * as userReducer from './UserReducer';
import message, * as messageReducer from './MessageReducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  auth,
  user,
  form,
  message
});

export default rootReducer;

/* Selectors */
export const getIsAuthenticating = state => authReducer.getIsAuthenticating(state.auth);
export const getIsAuthenticated = state => authReducer.getIsAuthenticated(state.auth);
export const getSigninError = state => authReducer.getSigninError(state.auth);
export const getSignupError = state => authReducer.getSignupError(state.auth);
export const getMessage = state => messageReducer.getMessage(state.message);
export const getProfile = state => userReducer.getProfile(state.user);
export const getAccount = state => userReducer.getAccount(state.user);
export const getUserName = state => userReducer.getUserName(state.user);