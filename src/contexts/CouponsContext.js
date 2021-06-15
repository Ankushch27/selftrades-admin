import React, { createContext, useReducer, useContext } from 'react';
import { CouponsReducer } from '../reducers/CouponsReducer';

const CouponsContext = createContext();

export const useCouponsContext = () => {
  return useContext(CouponsContext)
}

const CouponsContextProvider = (props) => {
  const initialCoupons = [];

  const [couponsState, couponsDispatch] = useReducer(CouponsReducer, initialCoupons);

  return (
    <CouponsContext.Provider value={{ couponsState, couponsDispatch }}>
      {props.children}
    </CouponsContext.Provider>
  );
};

export default CouponsContextProvider;
