import actionTypes from './actionTypes';

export const addCoupon = (couponsDispatch, coupon) => {
  couponsDispatch({ type: actionTypes.ADD_COUPON, value: coupon });
};

export const loadCoupons = (couponsDispatch, coupons) => {
  couponsDispatch({ type: actionTypes.LOAD_COUPONS, value: coupons });
};

export const updateCoupon = (couponsDispatch, coupon) => {
  couponsDispatch({ type: actionTypes.UPDATE_COUPON, value: coupon });
};
