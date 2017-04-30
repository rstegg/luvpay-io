import 'semantic-ui-css/semantic.min.css'
import '../styles/Main.css'
import 'rxjs'
import './config'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter as Router } from 'react-router-redux'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Posts from './pages/Posts'
import CreatePost from './pages/CreatePost'
import ViewPost from './pages/ViewPost'
import EditPost from './pages/EditPost'
import Payments from './pages/Payments'
import CreatePayment from './pages/CreatePayment'
import ViewPayment from './pages/ViewPayment'
import EditProfile from './pages/EditProfile'
import ViewProfile from './pages/ViewProfile'

import store, { history } from './store'

render(
  <Provider store={store}>
    <Router history={history}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/posts' component={Posts} />
          <Route exact path='/posts/new' component={CreatePost} />
          <Route exact path='/post/:id' component={ViewPost} />
          <Route exact path='/posts/edit/:id' component={EditPost} />
          <Route exact path='/payments' component={Payments} />
          <Route exact path='/payments/new/:id' component={CreatePayment} />
          <Route exact path='/payments/view/:id' component={ViewPayment} />
          <Route exact path='/user/:id' component={ViewProfile} />
          <Route exact path='/profile/edit' component={EditProfile} />
        </Switch>
    </Router>
  </Provider>,
  document.querySelector('#root')
)
