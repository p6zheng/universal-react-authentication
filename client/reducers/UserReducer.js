import * as actionTypes from '../constants/actionTypes';

const initialState = {};

const user = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_SUCCESS:
      return {
        ...state,
        profile: {
          name: action.userName
        }
      }
    case actionTypes.FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile
      };
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile
      }
    case actionTypes.FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: action.account
      }
    default:
      return state
  }
}

export default user;

export const getProfile = state => state.profile;
export const getAccount = state => state.account;
export const getUserName = state => state.profile === undefined ? '' :state.profile.name;