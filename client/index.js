import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { AUTH_USER_SUCCESS, DISPLAY_FLASH_MESSAGE } from './constants/actionTypes';
import Root from './Root';


const store = configureStore();

const { token, userName, userPhoto, flashMessage } = window.initialData;

if (typeof token !== 'undefined') {
  store.dispatch({
    type: AUTH_USER_SUCCESS,
    userName,
    userPhoto
  });
  if (flashMessage) {
    store.dispatch({
      type: DISPLAY_FLASH_MESSAGE,
      flashMessage
    });
  }
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
