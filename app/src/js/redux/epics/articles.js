import { onFetchArticlesSuccess, onFetchSingleArticleSuccess, onCreateArticleSuccess } from '../actions/articles'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchArticles: ({token}) => {
    const request = su.get(`${API_HOST}/articles`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  fetchSingleArticle: ({articleId, token}) => {
    const request = su.get(`${API_HOST}/article/${articleId}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  createArticle: ({article, user}) => {
   const request = su.post(`${API_HOST}/articles`)
      .send({article})
      .set('Accept', 'application/json')
      .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
}

export const fetchArticles = action$ =>
  action$.ofType('FETCH_ARTICLES')
    .mergeMap(action =>
      api.fetchArticles(action.payload)
        .map(onFetchArticlesSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_ARTICLES_FAILURE'
        }))
      )

export const fetchSingleArticle = action$ =>
  action$.ofType('FETCH_SINGLE_ARTICLE')
    .mergeMap(action =>
      api.fetchSingleArticle(action.payload)
        .map(onFetchSingleArticleSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_SINGLE_ARTICLE_FAILURE'
        }))
      )

export const createArticle = action$ =>
  action$.ofType('CREATE_ARTICLE')
    .mergeMap(action =>
      api.createArticle(action.payload)
        .map(onCreateArticleSuccess)
        .catch(error => Observable.of({
          type: 'CREATE_ARTICLE_FAILURE'
        }))
      )
