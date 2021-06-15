import actionTypes from '../actions/actionTypes';

export const AuthReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER:
      return {
        ...prevState,
        isLoading: false,
        userToken: action.value.token,
        userData: action.value.userData,
      };
    case actionTypes.LOGOUT:
      return {
        ...prevState,
        userData: null,
        userToken: null,
        isLoading: false,
      };
    case actionTypes.STOP_LOADING:
      return {
        ...prevState,
        isLoading: false,
      };
    default:
      break;
  }
};
