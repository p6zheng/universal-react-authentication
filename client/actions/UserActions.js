import axios from 'axios';
import * as actionTypes from '../constants/actionTypes';

const ROOT_URL = 'http://localhost:3000/api';

export const fetchProfile = () => (disptach) => {
  disptach({ type: actionTypes.FETCH_PROFILE_REQUEST });

  axios.get(`${ROOT_URL}/user/profile`).then(
    res => {
      disptach({
        type: actionTypes.FETCH_PROFILE_SUCCESS,
        profile: res.data.user
      });
    },
    error => {
      disptach({
        type: actionTypes.FETCH_PROFILE_ERROR,
        error: error.response.data.message
      });
    }
  );
};

export const updateProfile = (profile) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_PROFILE_REQUEST });

  axios.post(`${ROOT_URL}/user/profile`, profile).then(
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
        error: error.response.data.message
      });
    }
  );
};

export const fetchAccount = () => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_ACCOUNT_REQUEST });

  axios.get(`${ROOT_URL}/user/account`).then(
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
        error: error.response.data.message
      });
    }
   );
};

export const updateAccount = (account) => (dispatch) => {
  dispatch({ type: actionTypes.UPDATE_ACCOUNT_REQUEST });

  axios.post(`${ROOT_URL}/user/account`, account).then(
    () => {
      dispatch({
        type: actionTypes.UPDATE_ACCOUNT_SUCCESS,
        account
      });
    },
    error => {
      dispatch({
        type: actionTypes.UPDATE_ACCOUNT_ERROR,
        error: error.response.data.message
      });
    }
  );
};

export const uploadPhoto = (photo) => (dispatch) => {
  let data = new FormData();
  data.append('photo', photo);
  dispatch({ type: actionTypes.UPLOAD_IMAGE_REQUEST });

  axios.post(`${ROOT_URL}/user/photo`, data).then(
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
        error: error.response.data.message
      });
    }
  );
};

export const unlinkAccount = (account) => (dispatch) => {
  dispatch({ type: actionTypes.UNLINK_ACCOUNT_REQUEST });

  axios.post(`${ROOT_URL}/user/unlink`, { account }).then(
    res => {
      dispatch({
        type: actionTypes.UNLINK_ACCOUNT_SUCCESS,
        message: res.data.message,
        account
      });
    },
    error => {
      dispatch({
        type: actionTypes.UNLINK_ACCOUNT,
        error: error.response.data.message
      });
    }
  );
};

export const unmountComponent = () => ({
  type: actionTypes.UNMOUNT_COMPONENT
});

