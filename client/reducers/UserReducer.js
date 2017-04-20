import * as actionTypes from '../constants/actionTypes';

const initialState = {};

const user = (state=initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USER_SUCCESS:
      return {
        ...state,
        profile: {
          name: action.userName,
        },
        photo: action.userPhoto
      };
    case actionTypes.FETCH_PROFILE_SUCCESS:
    case actionTypes.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
        message: action.message
      };
    case actionTypes.FETCH_ACCOUNT_SUCCESS:
    case actionTypes.UPDATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          ...action.account
        },
        message: action.message,
        error: action.error
      };
    case actionTypes.UPLOAD_IMAGE_REQUEST:
    case actionTypes.UNMOUNT_COMPONENT:
      return {
        ...state,
        message: undefined,
        error: undefined
      };
    case actionTypes.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        photo: action.userPhoto,
        message: action.message
      };
    case actionTypes.UNLINK_ACCOUNT_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          [state.account.linkedAccounts[action.provider]]: false
        }
      };
    case actionTypes.FETCH_ACCOUNT_ERROR:
    case actionTypes.UPDATE_ACCOUNT_ERROR:
    case actionTypes.FETCH_PROFILE_ERROR:
    case actionTypes.UPDATE_PROFILE_ERROR:
    case actionTypes.UNLINK_ACCOUNT_ERROR:
    case actionTypes.UPLOAD_IMAGE_ERROR:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default user;

export const getProfile = state => state.profile;
export const getAccount = state => state.account;
export const getUserName = state => state.profile === undefined ? '' :state.profile.name;
export const getUserPhoto = state => state.photo;
export const getUserSuccess = state => state.message;
export const getUserError = state => state.error;