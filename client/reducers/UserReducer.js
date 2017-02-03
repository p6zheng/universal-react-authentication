import * as actionTypes from '../constants/actionTypes';

const initialState = {};

const user = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER:
      return {
        ...state,
        profile: {
          name: action.userName
        }
      }
    case actionTypes.FETCH_PROFILE:
      return {
        ...state,
        profile: action.profile
      };
    case actionTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.profile
      }
    default:
      return state
  }
}

export default user;

export const getUser = state => state.profile;
export const getUserName = state => state.profile === undefined ? '' :state.profile.name;