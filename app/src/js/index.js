import 'semantic-ui-css/semantic.min.css'
import '../styles/Main.css'
import 'rxjs'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router'
import { ConnectedRouter as Router } from 'react-router-redux'

import Home from './pages/Home'
import Feed from './pages/Feed'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Posts from './pages/Posts'

import CreatePost from './pages/CreatePost'
import ViewPost from './pages/ViewPost'
import EditPost from './pages/EditPost'

import Pages from './pages/Pages'
import CreatePage from './pages/CreatePage'
import ViewPage from './pages/ViewPage'
import EditPage from './pages/EditPage'

import Articles from './pages/Articles'
import CreateArticle from './pages/CreateArticle'
import ViewArticle from './pages/ViewArticle'

import EditProfile from './pages/EditProfile'
import ViewProfile from './pages/ViewProfile'

import store, { history } from './store'

import RootLayout from './components/layouts/Root'

render(
  <Provider store={store}>
    <Router history={history}>
        <RootLayout>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/feed' component={Feed} />
            <Route exact path='/posts' component={Posts} />
            <Route exact path='/posts/new' component={CreatePost} />
            <Route exact path='/posts/edit/:id' component={EditPost} />
            <Route exact path='/post/:id' component={ViewPost} />
            <Route exact path='/pages' component={Pages} />
            <Route exact path='/pages/new' component={CreatePage} />
            <Route exact path='/pages/edit/:id' component={EditPage} />
            <Route exact path='/page/:id' component={ViewPage} />
            <Route exact path='/articles' component={Articles} />
            <Route exact path='/articles/new' component={CreateArticle} />
            <Route exact path='/article/:id' component={ViewArticle} />
            <Route exact path='/user/:id' component={ViewProfile} />
            <Route exact path='/profile/edit' component={EditProfile} />
          </Switch>
        </RootLayout>
    </Router>
  </Provider>,
  document.querySelector('#root')
)
