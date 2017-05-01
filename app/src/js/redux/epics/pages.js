import { onFetchPagesSuccess, onFetchSinglePageSuccess, onCreatePageSuccess } from '../actions/pages'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchPages: ({token}) => {
    const request = su.get(`${API_HOST}/pages`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  fetchSinglePage: ({pageId, token}) => {
    const request = su.get(`${API_HOST}/page/${pageId}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  createPage: ({page, user}) => {
   const request = su.post(`${API_HOST}/pages`)
      .send({page})
      .set('Accept', 'application/json')
      .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
}

export const fetchPages = action$ =>
  action$.ofType('FETCH_PAGES')
    .mergeMap(action =>
      api.fetchPages(action.payload)
        .map(onFetchPagesSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_PAGES_FAILURE'
        }))
      )

export const fetchSinglePage = action$ =>
  action$.ofType('FETCH_SINGLE_PAGE')
    .mergeMap(action =>
      api.fetchSinglePage(action.payload)
        .map(onFetchSinglePageSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_SINGLE_PAGE_FAILURE'
        }))
      )

export const createPage = action$ =>
  action$.ofType('CREATE_PAGE')
    .mergeMap(action =>
      api.createPage(action.payload)
        .map(onCreatePageSuccess)
        .catch(error => Observable.of({
          type: 'CREATE_PAGE_FAILURE'
        }))
      )
