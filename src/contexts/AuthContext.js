import React, { createContext, useReducer, useContext } from 'react';
import { AuthReducer } from '../reducers/AuthReducer';

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext)
}

const AuthContextProvider = (props) => {
  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userData: null,
  };

  const [loginState, loginDispatch] = useReducer(AuthReducer, initialLoginState);

  return (
    <AuthContext.Provider value={{ loginState, loginDispatch }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
