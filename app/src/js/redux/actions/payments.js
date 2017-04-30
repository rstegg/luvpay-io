export const refreshPayments = () =>
({
  type: 'REFRESH_PAYMENTS'
})

export const fetchPayments = user =>
({
  type: 'FETCH_PAYMENTS',
  payload: {
    token: user.token
  }
})

export const onFetchPaymentsSuccess = res =>
({
  type: 'FETCH_PAYMENTS_SUCCESS',
  payload: {
    payments: res.body.payments
  }
})

export const fetchSinglePayment = (id, user) =>
({
  type: 'FETCH_SINGLE_PAYMENT',
  payload: {
    paymentId: id,
    token: user.token
  }
})

export const onFetchSinglePaymentSuccess = res =>
({
  type: 'FETCH_SINGLE_PAYMENT_SUCCESS',
  payload: {
    payment: res.body.payment
  }
})

export const createPayment = (payment, user, postId) =>
({
  type: 'CREATE_PAYMENT',
  payload: {
    payment,
    user,
    postId
  }
})

export const onCreatePaymentSuccess = res =>
({
  type: 'CREATE_PAYMENT_SUCCESS',
  payload: {
    payment: res.body.payment
  }
})

export const setCurrentPayment = payment =>
({
  type: 'SET_CURRENT_PAYMENT',
  payload: {
    payment
  }
})
