import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import AdminView from './AsOwner'
import UserView from './AsUser'

import { fetchSinglePage, deletePage, joinPage } from '../../redux/actions/pages'


class ViewPage extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    this.props.fetchSinglePage(params.id, user)
  }
  render() {
    const { page, user, joinPage, deletePage } = this.props
    if(!page) {
      return <Redirect to='/' />
    }
    if(page.userId === user.id) {
      const adminViewProps = { page, user, deletePage }
      return <AdminView {...adminViewProps} />
    }
    const userViewProps = { page, user, joinPage }
    return <UserView {...userViewProps} />
  }
}

const mapStateToProps = ({pages, user}) =>
({
  page: pages.current,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchSinglePage: (pageId, user) => dispatch(fetchSinglePage(pageId, user)),
  deletePage: (pageId, user) => dispatch(deletePage(pageId, user)),
  joinPage: (pageId, user) => dispatch(joinPage(pageId, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPage)
