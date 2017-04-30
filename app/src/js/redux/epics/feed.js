import { onFetchFeedSuccess } from '../actions/feed'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchFeed: () => {
    const request =
      su.get(`${API_HOST}/feed`)
        .set('Accept', 'application/json')
    return Observable.fromPromise(request)
  }
}

export const fetchFeed = action$ =>
  action$.ofType('FETCH_FEED')
    .switchMap(() =>
      api.fetchFeed()
        .map(onFetchFeedSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_FEED_FAILURE'
        }))
    )
