import actionTypes from '../actions/actionTypes'

export const ModalReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.TOGGLE_MODAL:
      return {
        ...state,
        isModalOpen: action.value,
        coupon: '',
        discount: '',
        module: 'Select',
        isEditMode: false,
        id: ''
      }
    case actionTypes.SET_ACTIVE:
      return {
        ...state,
        active: action.value === 1 ? true : false
      }
    case actionTypes.SET_COUPON:
      return {
        ...state,
        coupon: action.value
      }
    case actionTypes.SET_DISCOUNT:
      return {
        ...state,
        discount: action.value
      }
    case actionTypes.SET_MODULE:
      return {
        ...state,
        module: action.value
      }
    case actionTypes.SET_EDIT_MODE:
      return {
        ...state,
        isEditMode: action.value
      }
    case actionTypes.SET_COUPON_ID:
      return {
        ...state,
        id: action.value
      }
    default:
      return state;
  }
}