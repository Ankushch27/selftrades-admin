import React, { createContext, useReducer } from 'react';
import { ModalReducer } from '../reducers/ModalReducer';

export const ModalContext = createContext();

const ModalContextProvider = (props) => {
  const initialModalState = {
    isModalOpen: false,
    active: true,
    coupon: '',
    discount: '',
    module: 'Select',
    isEditMode: false,
    id: ''
  };

  const [modalState, modalDispatch] = useReducer(ModalReducer, initialModalState);
  return (
    <ModalContext.Provider value={{ modalState, modalDispatch }}>
      {props.children}
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
