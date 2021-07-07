import actionTypes from '../actions/actionTypes';

export const AuthReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_USER:
      return {
        ...prevState,
        isLoading: false,
        userToken: action.value.token,
      };
    case actionTypes.LOGOUT:
      return {
        ...prevState,
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
