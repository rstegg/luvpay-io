import { onFetchPagesSuccess, onFetchSinglePageSuccess, onCreatePageSuccess, onEditPageSuccess, onDeletePageSuccess, onUploadPageImageSuccess, onUploadEditPageImageSuccess } from '../actions/pages'
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
  editPage: ({page, user}) => {
   const request = su.put(`${API_HOST}/page/${page.id}`)
      .send({page})
      .set('Accept', 'application/json')
      .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
  deletePage: ({pageId, user}) => {
   const request = su.delete(`${API_HOST}/page/${pageId}`)
      .set('Accept', 'application/json')
      .set('Authorization', user.token)
    return Observable.fromPromise(request)
  },
  uploadPageImage: ({image, token}) => {
    const request = su.post(`${API_HOST}/image/page`)
      .attach('image', image)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  uploadEditPageImage: ({image, pageId, token}) => {
    const request = su.post(`${API_HOST}/image/page/${pageId}`)
      .attach('image', image)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  }
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

export const editPage = action$ =>
  action$.ofType('EDIT_PAGE')
    .mergeMap(action =>
      api.editPage(action.payload)
        .map(onEditPageSuccess)
        .catch(error => Observable.of({
          type: 'EDIT_PAGE_FAILURE'
        }))
      )

export const deletePage = action$ =>
  action$.ofType('DELETE_PAGE')
    .mergeMap(action =>
      api.deletePage(action.payload)
        .map(onDeletePageSuccess)
        .catch(error => Observable.of({
          type: 'DELETE_PAGE_FAILURE'
        }))
      )

export const uploadPageImage = action$ =>
  action$.ofType('UPLOAD_PAGE_IMAGE')
    .mergeMap(action =>
      api.uploadPageImage(action.payload)
        .map(onUploadPageImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_PAGE_IMAGE_FAILURE'
        }))
      )

export const uploadEditPageImage = action$ =>
  action$.ofType('UPLOAD_EDIT_PAGE_IMAGE')
    .mergeMap(action =>
      api.uploadEditPageImage(action.payload)
        .map(onUploadEditPageImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_EDIT_PAGE_IMAGE_FAILURE'
        }))
      )
