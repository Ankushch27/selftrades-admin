import actionTypes from './actionTypes';

export const openModal = (modalDispatch) => {
  modalDispatch({ type: actionTypes.TOGGLE_MODAL, value: true });
};

export const closeModal = (modalDispatch) => {
  modalDispatch({ type: actionTypes.TOGGLE_MODAL, value: false });
};

export const setActive = (modalDispatch, active) => {
  modalDispatch({ type: actionTypes.SET_ACTIVE, value: active });
};

export const setCoupon = (modalDispatch, coupon) => {
  modalDispatch({ type: actionTypes.SET_COUPON, value: coupon });
};

export const setDiscount = (modalDispatch, discount) => {
  modalDispatch({ type: actionTypes.SET_DISCOUNT, value: discount });
};

export const setModule = (modalDispatch, module) => {
  modalDispatch({ type: actionTypes.SET_MODULE, value: module });
};

export const setCouponId = (modalDispatch, id) => {
  modalDispatch({ type: actionTypes.SET_COUPON_ID, value: id });
};

export const setEditMode = (modalDispatch) => {
  modalDispatch({ type: actionTypes.SET_EDIT_MODE, value: true });
};
