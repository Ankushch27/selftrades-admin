import actionTypes from '../actions/actionTypes';

export const CouponsReducer = (prevState, action) => {
  switch (action.type) {
    case actionTypes.ADD_COUPON:
      return [action.value, ...prevState];
    case actionTypes.LOAD_COUPONS:
      return action.value;
    case actionTypes.UPDATE_COUPON:
      return prevState.map((coupon) => {
        if (coupon.id === action.value.id) return action.value;
        return coupon;
      });
    default:
      return prevState;
  }
};
