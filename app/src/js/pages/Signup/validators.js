import su from 'superagent'
const API_HOST = '/api/v1'

export const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Required'
  }
  if (!values.username) {
    errors.username = 'Required'
  } else if(values.username.length > 20) {
    errors.username = 'Maximum 20 characters'
  } else if(values.username.length < 4) {
    errors.username = 'Minimum 4 characters'
  } else if(!/^([a-zA-Z]+)[0-9]*\.*[a-zA-Z0-9]+$|^[a-zA-Z]+[0-9]*$/.test(values.username)) {
    errors.username = 'Invalid username'
  }
  if (!values.email) {
    errors.email = 'Required'
  } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email'
  }
  if (!values.password) {
    errors.password = 'Required'
  } else if(values.password < 6) {
    errors.password = '6 or more characters'
  }
  return errors
}

export const asyncValidate = (values, dispatch, props, field) => {
  const previousErrors = props.asyncErrors;
  if(field === 'username') {
  return su.post(`${API_HOST}/signup/validate_username`)
    .send({ username: values.username })
    .set('Accept', 'application/json')
    .then(res => {
      if(res.body.usernameTaken) {
        // eslint-disable-next-line
        throw Object.assign({}, previousErrors, { username: 'That username is taken'});
      }
    })
  } else if(field === 'email') {
    return su.post(`${API_HOST}/signup/validate_email`)
    .send({ email: values.email })
    .set('Accept', 'application/json')
    .then(res => {
      if(res.body.emailTaken) {
        // eslint-disable-next-line
        throw Object.assign({}, previousErrors, { email: 'That email is already registerd'});
      }
    })
  } else {
    return new Promise((resolve, reject) => resolve())
  }
}
