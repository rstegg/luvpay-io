import { onFetchPaymentsSuccess, onFetchSinglePaymentSuccess, onCreatePaymentSuccess } from '../actions/payments'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchPayments: ({token}) => {
    const request = su.get(`${API_HOST}/payments`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  fetchSinglePayment: ({paymentId, token}) => {
    const request = su.get(`${API_HOST}/payment/${paymentId}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  createPayment: ({card, payment, user, postId}) => {
   const request = su.post(`${API_HOST}/payments`)
      .send({card, payment, postId})
      .set('Accept', 'application/json')
      .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
}

export const fetchPayments = action$ =>
  action$.ofType('FETCH_PAYMENTS')
    .mergeMap(action =>
      api.fetchPayments(action.payload)
        .map(onFetchPaymentsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_PAYMENTS_FAILURE'
        }))
      )

export const fetchSinglePayment = action$ =>
  action$.ofType('FETCH_SINGLE_PAYMENT')
    .mergeMap(action =>
      api.fetchSinglePayment(action.payload)
        .map(onFetchSinglePaymentSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_SINGLE_PAYMENT_FAILURE'
        }))
      )

export const createPayment = action$ =>
  action$.ofType('CREATE_STRIPE_CARD_SUCCESS')
    .mergeMap(action =>
      api.createPayment(action.payload)
        .map(onCreatePaymentSuccess)
        .catch(error => Observable.of({
          type: 'CREATE_PAYMENT_FAILURE'
        }))
      )
