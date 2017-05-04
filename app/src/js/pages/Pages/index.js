import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import PagesList from './list'
import RouterButton from '../../elements/RouterButton'

import { fetchPages, setCurrentPage, refreshPages } from '../../redux/actions/pages'

class Pages extends Component {
  componentDidMount() {
    if(this.props.user.isAuthenticated) {
      this.props.fetchPages(this.props.user)
      this.props.refreshPages()
    }
  }
  render() {
    const { pages, setCurrentPage } = this.props
    if(!this.props.user.isAuthenticated) {
      return <Redirect to='/login' from='/pages' />
    }
    return (
      <Card className='posts'>
        <Card.Content className='card__list'>
          <Card.Header>Pages</Card.Header>
          <Card.Description>
            <PagesList
              pages={pages}
              setCurrentPage={setCurrentPage}
             />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <RouterButton to='/pages/new' from='/pages' label='start a page' />
        </Card.Content>
      </Card>
    )
  }
}
const mapStateToProps = ({pages, user}) =>
({
  pages: pages.list,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchPages: user => dispatch(fetchPages(user)),
  setCurrentPage: page => dispatch(setCurrentPage(page)),
  refreshPages: () => dispatch(refreshPages()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Pages)
