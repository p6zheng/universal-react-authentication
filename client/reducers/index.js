import { combineReducers } from 'redux';
import auth, * as authReducer from './AuthReducer';
import user, * as userReducer from './UserReducer';
import { reducer as form } from 'redux-form';

const rootReducer = combineReducers({
  auth,
  user,
  form
});

export default rootReducer;

/* Selectors */
export const getIsAuthenticated = (state) => authReducer.getIsAuthenticated(state.auth);

export const getError = (state) => authReducer.getError(state.auth);
export const getMessage = (state) => authReducer.getMessage(state.auth);

export const getUser = (state) => userReducer.getUser(state.user);
export const getUserName = (state) => userReducer.getUserName(state.user);