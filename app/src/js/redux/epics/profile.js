import { onUploadAvatarSuccess, onEditProfileSuccess, onFetchProfileSuccess } from '../actions/profile'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  fetchProfile: ({id, token}) => {
    const request = su.get(`${API_HOST}/profile/${id}`)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  uploadAvatar: ({image, token}) => {
    const request = su.post(`${API_HOST}/profile/avatar`)
      .attach('avatar', image)
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  },
  editProfile: ({profile, token}) => {
   const request = su.post(`${API_HOST}/profile`)
      .send({profile})
      .set('Accept', 'application/json')
      .set('Authorization', token)
    return Observable.fromPromise(request)
  }
}

export const fetchProfile = action$ =>
  action$.ofType('FETCH_PROFILE')
    .mergeMap(action =>
      api.fetchProfile(action.payload)
        .map(onFetchProfileSuccess)
        .catch(error => Observable.of({
          type: 'FETCH_PROFILE_FAILURE'
        }))
    )

export const uploadAvatar = action$ =>
  action$.ofType('UPLOAD_AVATAR')
    .mergeMap(action =>
      api.uploadAvatar(action.payload)
        .map(onUploadAvatarSuccess)
        .catch(error => Observable.of({
          type: 'UPLOAD_AVATAR_FAILURE'
        }))
    )

export const editProfile = action$ =>
  action$.ofType('EDIT_PROFILE')
    .mergeMap(action =>
      api.editProfile(action.payload)
        .map(onEditProfileSuccess)
        .catch(error => Observable.of({
          type: 'EDIT_PROFILE_FAILURE'
        }))
    )
