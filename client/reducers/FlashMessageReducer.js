import * as actionTypes from '../constants/actionTypes';

const flashMessage = (state={}, action) => {
  switch (action.type) {
    case actionTypes.DISPLAY_FLASH_MESSAGE:
      return  action.flashMessage;
    case actionTypes.UNLINK_ACCOUNT_SUCCESS:
      return {
        message: action.message,
        type: 'SUCCESS'
      };
    case actionTypes.UNMOUNT_COMPONENT:
    case actionTypes.UNLINK_ACCOUNT_REQUEST:
      return {};
    default:
      return state;
  }
};

export default flashMessage;

export const getFlashMessage = state => state;