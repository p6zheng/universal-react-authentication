import * as actionTypes from '../constants/actionTypes';

const flashMessage = (state={}, action) => {
  switch (action.type) {
    case actionTypes.DISPLAY_FLASH_MESSAGE:
      return {
        flashMessage: action.flashMessage
      };
    case actionTypes.UNMOUNT_COMPONENT:
      return {};
    default:
      return state;
  }
};

export default flashMessage;

export const getFlashMessage = state => state.flashMessage;