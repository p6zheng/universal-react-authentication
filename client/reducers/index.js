import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import auth, * as authReducer from './AuthReducer';
import user, * as userReducer from './UserReducer';
import message, * as messageReducer from './MessageReducer';
import flashMessage, * as flashMessageReducer from './FlashMessageReducer';

const rootReducer = combineReducers({
  auth,
  user,
  form,
  message,
  flashMessage
});

export default rootReducer;

/* Selectors */

// Auth Reducer
export const getIsAuthenticating = state => authReducer.getIsAuthenticating(state.auth);
export const getIsAuthenticated = state => authReducer.getIsAuthenticated(state.auth);
export const getSigninError = state => authReducer.getSigninError(state.auth);
export const getSignupError = state => authReducer.getSignupError(state.auth);

// Secret Message Reducer
export const getMessage = state => messageReducer.getMessage(state.message);

// User Reducer
export const getProfile = state => userReducer.getProfile(state.user);
export const getAccount = state => userReducer.getAccount(state.user);
export const getUserName = state => userReducer.getUserName(state.user);
export const getUserPhoto = state => userReducer.getUserPhoto(state.user);
export const getUserSuccess = state => userReducer.getUserSuccess(state.user);
export const getUserError = state => userReducer.getUserError(state.user);

// Flash Message Reducer
export const getFlashMessage = state => flashMessageReducer.getFlashMessage(state.flashMessage);