import { applyMiddleware, createStore, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { persistStore, autoRehydrate } from 'redux-persist'

import createHistory from 'history/createBrowserHistory'

import { routerMiddleware } from 'react-router-redux'

import rootReducer from './redux/reducers'
import rootEpic from './redux/epics'

export const history = createHistory()

const epicMiddleware = createEpicMiddleware(rootEpic)
const routingMiddleware = routerMiddleware(history)

if (
  process.env.NODE_ENV === 'production' &&
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
  Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
) {
  window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {};
}

const composeEnhancers = process.env.NODE_ENV === 'development' ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose

const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(
    applyMiddleware(
      epicMiddleware,
      routingMiddleware
    ),
    autoRehydrate()
  )
)

const persistConfig = {
  whitelist: ['user', 'posts']
}

persistStore(store, persistConfig)

if(process.env.NODE_ENV === 'development') {
  if (module.hot) {
    module.hot.accept('./redux/reducers/index', () =>
      store.replaceReducer(require('./redux/reducers/index'))
    )
  }
}

export default store
