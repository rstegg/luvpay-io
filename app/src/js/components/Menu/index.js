import React from 'react'
import { connect } from 'react-redux'

import { Button, Popup } from 'semantic-ui-react'

import { push } from 'react-router-redux'

const BottomNav =
({
  isMobile,
  isTablet,
  user,
  toLogin,
  toSignup,
  toPosts,
  toPages,
  toArticles,
  toFeed,
  toPublicFeed,
  toPencil,
  toFreePencil,
  toSettings,
  toPower
}) =>
  !isMobile && (
    isTablet ?
    <div>
      <div className='menu--container--left'>
        <Popup position='top center' trigger={<Button basic circular onClick={toPublicFeed} icon='globe' size='massive' className='menu--button' />} content='public posts' />
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toFeed} icon='sticky note' size='massive' className='menu--button' />} content='your feed' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPosts} icon='sticky note' size='massive' className='menu--button' />} content='your posts' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPages} icon='book' size='massive' className='menu--button' />} content='your pages' />}
      </div>
      <div className='menu--container--right'>
        {!user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toLogin} icon='sign in' size='massive' className='menu--button' />} content='login' />}
        {!user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toSignup} icon='add user' size='massive' className='menu--button' />} content='sign up' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toArticles} icon='newspaper' size='massive' className='menu--button' />} content='your articles' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPencil} icon='edit' size='massive' className='menu--button' />} content='start a post' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={() => user.username && toSettings(user.username)} icon='setting' size='massive' className='menu--button' />} content='profile' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPower} icon='power' size='massive' className='menu--button' />} content='logout' />}
      </div>
    </div>
    :
    <div>
      <div className='menu--container'>
        <Popup position='top center' trigger={<Button basic circular onClick={toPublicFeed} icon='globe' size='massive' className='menu--button' />} content='public posts' />
        {!user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toLogin} icon='sign in' size='massive' className='menu--button' />} content='login' />}
        {!user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toSignup} icon='add user' size='massive' className='menu--button' />} content='sign up' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toFeed} icon='list layout' size='massive' className='menu--button' />} content='your feed' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPosts} icon='sticky note' size='massive' className='menu--button' />} content='your posts' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPages} icon='book' size='massive' className='menu--button' />} content='your pages' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toArticles} icon='newspaper' size='massive' className='menu--button' />} content='your articles' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPencil} icon='edit' size='massive' className='menu--button' />} content='start a post' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={() => user.username && toSettings(user.username)} icon='setting' size='massive' className='menu--button' />} content='profile' />}
        {user.isAuthenticated && <Popup position='top center' trigger={<Button basic circular onClick={toPower} icon='power' size='massive' className='menu--button' />} content='logout' />}
      </div>
    </div>
  )


const mapDispatchToProps = dispatch =>
({
  toLogin:    () => dispatch(push('/login')),
  toSignup:    () => dispatch(push('/signup')),
  toPages: () => dispatch(push('/pages')),
  toArticles: () => dispatch(push('/articles')),
  toPosts: () => dispatch(push('/posts')),
  toPublicFeed:     () => dispatch(push('/')),
  toFeed:     () => dispatch(push('/feed')),
  toPencil:   () => dispatch(push('/posts/new')),
  toSettings: username => dispatch(push(`/user/${username}`)),
  toPower:    () => dispatch({type: 'LOGOUT'})
})

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav)
