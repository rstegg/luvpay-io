import React from 'react'
import { connect } from 'react-redux'

import { push } from 'react-router-redux'

import TabletMenu from './TabletMenu'
import DesktopMenu from './DesktopMenu'

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
      <TabletMenu
        user={user}
        toLogin={toLogin}
        toSignup={toSignup}
        toPosts={toPosts}
        toPages={toPages}
        toArticles={toArticles}
        toFeed={toFeed}
        toPublicFeed={toPublicFeed}
        toPencil={toPencil}
        toFreePencil={toFreePencil}
        toSettings={toSettings}
        toPower={toPower}
      />
    :
      <DesktopMenu
        user={user}
        toLogin={toLogin}
        toSignup={toSignup}
        toPosts={toPosts}
        toPages={toPages}
        toArticles={toArticles}
        toFeed={toFeed}
        toPublicFeed={toPublicFeed}
        toPencil={toPencil}
        toFreePencil={toFreePencil}
        toSettings={toSettings}
        toPower={toPower}
      />
  )


const mapDispatchToProps = dispatch =>
({
  toLogin:      () => dispatch(push('/login')),
  toSignup:     () => dispatch(push('/signup')),
  toPages:      () => dispatch(push('/pages')),
  toArticles:   () => dispatch(push('/articles')),
  toPosts:      () => dispatch(push('/posts')),
  toPublicFeed: () => dispatch(push('/')),
  toFeed:       () => dispatch(push('/feed')),
  toPencil:     () => dispatch(push('/posts/new')),
  toSettings:   username => dispatch(push(`/user/${username}`)),
  toPower:      () => dispatch({type: 'LOGOUT'})
})

const mapStateToProps = ({user}) =>
({
  user
})

export default connect(mapStateToProps, mapDispatchToProps)(BottomNav)
