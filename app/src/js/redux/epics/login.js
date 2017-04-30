import { onLoginSuccess } from '../actions/login'
import su from 'superagent'
import { Observable } from 'rxjs/Rx'

const API_HOST = '/api/v1'

const api = {
  login: ({username, password}) => {
    const request = su.post(`${API_HOST}/login`)
        .send({username, password})
        .set('Accept', 'application/json')
    return Observable.fromPromise(request)
  }
}

const onLoginSubmit = action$ =>
  action$.ofType('LOGIN_SUBMIT')
    .mergeMap(action =>
      api.login(action.payload)
        .map(onLoginSuccess)
        .catch(error => Observable.of({
          type: 'LOGIN_FAILURE'
        }))
    )

export default onLoginSubmit
