import { onCreateStripeCardSuccess, onCreateStripeBankSuccess } from '../actions/stripe'
import { Observable } from 'rxjs/Rx'

const Stripe = window.Stripe

const api = {
  createStripeBank: ({ bank: { routing_number, account_number, account_holder_name, account_holder_type }, user }) => {
    const request =
      Observable.fromCallback(
        Stripe.bankAccount.createToken,
        (status, response) => ({ status, response })
      )
      return request({ country: 'US', currency: 'USD', routing_number, account_number, account_holder_name, account_holder_type })
  },
  createStripeCard: ({ payment: { number, cvc, expiry, address_zip }, user, postId }) => {
    const request =
      Observable.bindCallback(
        Stripe.card.createToken,
        (status, response) => ({ status, response })
      )
      return request({ number, cvc, expiry, address_zip })
  },
}

export const createStripeCard = action$ =>
  action$.ofType('CREATE_PAYMENT')
    .mergeMap(action =>
      api.createStripeCard(action.payload)
        .map(({status, response}) => {
          if(response.error) {
            return { type: 'CREATE_STRIPE_CARD_FAILURE' }
          } else {
            return onCreateStripeCardSuccess(response, action.payload)
          }
        })
      )

export const createStripeBank = action$ =>
  action$.ofType('CREATE_STRIPE_BANK')
    .mergeMap(action =>
      api.createStripeBank(action.payload)
        .map((status, response) =>
          onCreateStripeBankSuccess(status, response, action.payload.user)
        )
        .catch(error => Observable.of({
          type: 'CREATE_STRIPE_BANK_FAILURE'
        }))
    )
