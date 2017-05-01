import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'

import user from './user'
import feed from './feed'
import posts from './posts'
import pages from './pages'
import articles from './articles'
import profile from './profile'

export default combineReducers({
  articles,
  user,
  feed,
  posts,
  pages,
  profile,
  form: formReducer,
  router: routerReducer
})
