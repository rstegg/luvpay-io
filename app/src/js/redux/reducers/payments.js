const initialState = {
  current: {},
  new: {},
  list: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_PAYMENTS_SUCCESS':
      return Object.assign({}, state, {
        list: action.payload.payments
      })
    case 'CREATE_PAYMENT_SUCCESS':
      return Object.assign({}, state, {
        list: [...state.list, action.payload.payment],
        new: {
          ...state.new,
          isCreated: true
        }
      })
    case 'FETCH_SINGLE_PAYMENT_SUCCESS':
      return Object.assign({}, state, {
        current: action.payload.payment
      })
    case 'SET_CURRENT_PAYMENT':
      return Object.assign({}, state, {
        current: action.payload.payment
      })
    case 'REFRESH_PAYMENTS':
      return Object.assign({}, state, {
        current: initialState.current,
        new: initialState.new
      })
    case 'FETCH_PAYMENTS_FAILURE':
    case 'CREATE_STRIPE_CARD_FAILURE':
    case 'CREATE_PAYMENT_FAILURE':
    default:
      return state
  }
}
