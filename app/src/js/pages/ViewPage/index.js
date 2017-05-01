import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Label } from 'semantic-ui-react'
import RootLayout from '../../components/layouts/Root'
import PageMenu from '../../components/PageMenu'

import { fetchSinglePage } from '../../redux/actions/pages'

class ViewPage extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    this.props.fetchSinglePage(params.id, user)
  }
  render() {
    const { page, user } = this.props
    if(!page) {
      return <Redirect to='/' />
    }
    return (
      <RootLayout>
        <div className='pay--menu'>
          <PageMenu />
        </div>
        <Card>
          <Card.Content>
            <Card.Header>{user.name}</Card.Header>
            <Card.Meta>Paid - ${page.amount}</Card.Meta>
            <Card.Description>
              <Label basic>Note: {page.name}</Label>
            </Card.Description>
          </Card.Content>
        </Card>
      </RootLayout>
    )
  }
}

const mapStateToProps = ({pages, user}) =>
({
  page: pages.current,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchSinglePage: (pageId, user) => dispatch(fetchSinglePage(pageId, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewPage)
