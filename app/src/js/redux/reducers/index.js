import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import user from './user'
import feed from './feed'
import posts from './posts'
import payments from './payments'
import profile from './profile'

export default combineReducers({
  user,
  feed,
  posts,
  payments,
  profile,
  form: formReducer,
  router: routerReducer
})
