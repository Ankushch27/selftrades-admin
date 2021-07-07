import actionTypes from './actionTypes';

export const saveUser = (loginDispatch, token = null) => {
  sessionStorage.setItem('token', token);
  loginDispatch({ type: actionTypes.SAVE_USER, value: { token } });
};

export const logout = (loginDispatch) => {
  sessionStorage.removeItem('token');
  loginDispatch({ type: actionTypes.LOGOUT });
};

export const stopLoading = (loginDispatch) => {
  loginDispatch({ type: actionTypes.STOP_LOADING });
};
