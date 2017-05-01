import {
  onFetchPostsSuccess,
  onFetchSinglePostSuccess,
  onEditPostSuccess,
  onDeletePostSuccess,
  onCreatePostSuccess,
  onUploadPostImageSuccess,
  onUploadFreePostImageSuccess,
  onSharePostSuccess
} from '../actions/posts'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchPosts: ({token}) => {
    const request = su.get(`${API_HOST}/posts`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  fetchSinglePost: ({postId, token}) => {
    const request = su.get(`${API_HOST}/post/${postId}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  createPost: ({post, token}) => {
   const request = su.post(`${API_HOST}/posts`)
      .send({post})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  sharePost: ({name, email, message, token, url, postId}) => {
   const request = su.post(`${API_HOST}/share/post`)
      .send({name, email, message, token, url, postId})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  uploadPostImage: ({image, token}) => {
    const request = su.post(`${API_HOST}/image/post`)
      .attach('image', image)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  uploadFreePostImage: ({image}) => {
    const request = su.post(`${API_HOST}/image/post/free`)
      .attach('image', image)
      .set('Accept', 'application/json')
    return Observable.fromPromise(request)
  },
  editPost: ({id, name, description, image, amount, post_type, is_public, token}) => {
   const request = su.put(`${API_HOST}/post/${id}`)
      .send({name, description, image, amount, post_type, is_public})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  deletePost: ({id, token}) => {
   const request = su.delete(`${API_HOST}/post/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  }
}

export const fetchPosts = action$ =>
  action$.ofType('FETCH_POSTS')
    .mergeMap(action =>
      api.fetchPosts(action.payload)
        .map(onFetchPostsSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_POSTS_FAILURE'
        }))
      )

export const fetchSinglePost = action$ =>
  action$.ofType('FETCH_SINGLE_POST')
    .mergeMap(action =>
      api.fetchSinglePost(action.payload)
        .map(onFetchSinglePostSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_SINGLE_POST_FAILURE'
        }))
      )

export const sharePost = action$ =>
  action$.ofType('SHARE_POST')
    .mergeMap(action =>
      api.sharePost(action.payload)
        .map(onSharePostSuccess)
        .catch(error => Observable.of({
          type: 'SHARE_POST_FAILURE'
        }))
      )

export const createPost = action$ =>
  action$.ofType('CREATE_POST')
    .mergeMap(action =>
      api.createPost(action.payload)
        .map(onCreatePostSuccess)
        .catch(error => Observable.of({
          type: 'CREATE_POST_FAILURE'
        }))
      )

export const uploadPostImage = action$ =>
  action$.ofType('UPLOAD_POST_IMAGE')
    .mergeMap(action =>
      api.uploadPostImage(action.payload)
        .map(onUploadPostImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_POST_IMAGE_FAILURE'
        }))
    )

export const uploadFreePostImage = action$ =>
  action$.ofType('UPLOAD_FREE_POST_IMAGE')
    .mergeMap(action =>
      api.uploadFreePostImage(action.payload)
        .map(onUploadFreePostImageSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_FREE_POST_IMAGE_FAILURE'
        }))
    )

export const editPost = action$ =>
  action$.ofType('EDIT_POST')
    .mergeMap(action =>
      api.editPost(action.payload)
        .map(onEditPostSuccess)
        .catch(error => Observable.of({
          type: 'EDIT_POST_FAILURE'
        }))
      )

export const deletePost = action$ =>
  action$.ofType('DELETE_POST')
    .mergeMap(action =>
      api.deletePost(action.payload)
        .map(onDeletePostSuccess)
        .catch(error => Observable.of({
          type: 'DELETE_POST_FAILURE'
        }))
      )
