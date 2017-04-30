import { onAddCardAccountSuccess, onAddBankAccountSuccess } from '../actions/account'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  addCardAccount: (status, response, user) => {
    const request =
      su.post(`${API_HOST}/card`)
        .send(response)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
  addBankAccount: (status, response, user) => {
    const request =
      su.post(`${API_HOST}/bank`)
        .send(response)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
    return Observable.fromPromise(request)
  }
}

export const addCardAccount = action$ =>
  action$.ofType('CREATE_STRIPE_CARD_SUCCESS')
    .mergeMap(action =>
      api.addCardAccount(action.payload)
        .map(onAddCardAccountSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_FEED_FAILURE'
        }))
    )

export const addCardAccount = action$ =>
  action$.ofType('CREATE_STRIPE_CARD_SUCCESS')
    .mergeMap(action =>
      api.addBankAccount(action.payload)
        .map(onAddBankAccountSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_FEED_FAILURE'
        }))
    )
/*
(status, response) => {
  if(response.error) {
    console.log("error lol", response);
  } else {
    Observable.fromPromise(
      su.post(`${API_HOST}/bank`)
        .send(response)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
    )
  }
}
*/


/*
if(response.error) {
  console.log("error lol", response);
}
su.post(`${API_HOST}/card`)
    .send(response)
    .set('Accept', 'application/json')
    .set('Authorization', user.token)
return Observable.fromPromise(request)
}
*/
