import * as actionTypes from '../constants/actionTypes';
import api from '../utils/apiCaller';

export const fetchProfile = () => (disptach) => {
  disptach({ type: actionTypes.FETCH_PROFILE_REQUEST });

  api('api/user/profile').then(
    res => {
      disptach({
        type: actionTypes.FETCH_PROFILE_SUCCESS,
        profile: res.data.user
      });
    },
    error => {
      disptach({
        type: actionTypes.FETCH_PROFILE_ERROR,
        error: error.response.data.error
      });
    }
  );
};

export const updateProfile = (profile) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_PROFILE_REQUEST });

  api('api/user/profile', 'post', profile).then(
    res => {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_SUCCESS,
        profile,
        message:res.data.message
      });
    },
    error => {
      dispatch({
        type: actionTypes.UPDATE_PROFILE_ERROR,
        error: error.response.data.error
      });
    }
  );
};

export const fetchAccount = () => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_ACCOUNT_REQUEST });

  api('api/user/account').then(
    res => {
      dispatch({
        type: actionTypes.FETCH_ACCOUNT_SUCCESS,
        account: res.data.user,
        message:res.data.message
      });
    },
    error => {
      dispatch({
        type: actionTypes.FETCH_ACCOUNT_ERROR,
        error: error.response.data.error
      });
    }
   );
};

export const updateAccount = (account) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_ACCOUNT_REQUEST });

  api('api/user/account', 'post', account).then(
    res => {
      dispatch({
        type: actionTypes.UPDATE_ACCOUNT_SUCCESS,
        message: res.data.message
      });
    },
    error => {
      dispatch({
        type: actionTypes.UPDATE_ACCOUNT_ERROR,
        error: error.response.data.error
      });
    }
  );
};

export const uploadPhoto = (photo) => (dispatch) => {
  let data = new FormData();
  data.append('photo', photo);
  dispatch({ type: actionTypes.UPLOAD_IMAGE_REQUEST });

  api('api/user/photo', 'post', data).then(
    res => {
      dispatch({
        type: actionTypes.UPLOAD_IMAGE_SUCCESS,
        userPhoto: res.data.userPhoto,
        message: res.data.message
      });
    },
    error => {
      dispatch({
        type: actionTypes.UPLOAD_IMAGE_ERROR,
        error: error.response.data.error
      });
    }
  );
};

export const unlinkProvider = (provider) => (dispatch) => {
  dispatch({ type: actionTypes.UNLINK_ACCOUNT_REQUEST });

  api('api/user/unlink', 'post', { provider }).then(
    res => {
      dispatch({
        type: actionTypes.UNLINK_ACCOUNT_SUCCESS,
        message: res.data.message,
        provider
      });
    },
    error => {
      dispatch({
        type: actionTypes.UNLINK_ACCOUNT,
        error: error.response.data.error
      });
    }
  );
};

export const unmountComponent = () => ({
  type: actionTypes.UNMOUNT_COMPONENT
});

