import { onFetchFeedSuccess, onFetchPublicFeedSuccess } from '../actions/feed'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchFeed: ({user}) => {
    const request =
      su.get(`${API_HOST}/feed`)
        .set('Accept', 'application/json')
        .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
  fetchPublicFeed: () => {
    const request =
      su.get(`${API_HOST}/feed/public`)
        .set('Accept', 'application/json')
    return Observable.fromPromise(request)
  }
}

export const fetchFeed = action$ =>
  action$.ofType('FETCH_FEED')
    .mergeMap(action =>
      api.fetchFeed(action.payload)
        .map(onFetchFeedSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_FEED_FAILURE'
        }))
    )

export const fetchPublicFeed = action$ =>
  action$.ofType('FETCH_PUBLIC_FEED')
    .switchMap(() =>
      api.fetchPublicFeed()
        .map(onFetchPublicFeedSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_PUBLIC_FEED_FAILURE'
        }))
    )
