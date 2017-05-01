import React from 'react'

import MenuButton from '../../elements/MenuButton'

export default
({
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
  <div>
    <div className='menu--container--left'>
      <MenuButton onClick={toPublicFeed} icon='globe' text='public posts' />
      {user.isAuthenticated && <MenuButton onClick={toFeed} icon='list layout' text='your feed' />}
      {user.isAuthenticated && <MenuButton onClick={toPosts} icon='sticky note' text='your posts' />}
      {user.isAuthenticated && <MenuButton onClick={toPages} icon='book' text='your pages' />}
    </div>
    <div className='menu--container--right'>
      {!user.isAuthenticated && <MenuButton onClick={toLogin} icon='sign in' text='login' />}
      {!user.isAuthenticated && <MenuButton onClick={toSignup} icon='add user' text='sign up' />}
      {user.isAuthenticated && <MenuButton onClick={toArticles} icon='newspaper' text='your articles' />}
      {user.isAuthenticated && <MenuButton onClick={toPencil} icon='edit' text='start a post' />}
      {user.isAuthenticated && <MenuButton onClick={() => user.username && toSettings(user.username)} icon='setting' text='profile' />}
      {user.isAuthenticated && <MenuButton onClick={toPower} icon='power' text='logout' />}
    </div>
  </div>
