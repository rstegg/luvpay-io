import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import CreatePageForm from './form'

import { createPage } from '../../redux/actions/pages'

import RootLayout from '../../components/layouts/Root'

const CreatePage = ({ user, page, createPage, uploadPostImage }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/pages/new' />
  :
  page.isCreated ?
    <Redirect to='/pages' from='/pages/new' />
  :
    <RootLayout>
      <Card>
        <Card.Content>
          <Card.Header>New Page</Card.Header>
          <Card.Description>
            <CreatePageForm
              page={page}
              onSubmit={page => createPage(page, user)}
            />
          </Card.Description>
        </Card.Content>
      </Card>
    </RootLayout>

const mapStateToProps = ({user, pages}) =>
({
  user,
  page: pages.new
})

const mapDispatchToProps = dispatch =>
({
  createPage: (page, user) => dispatch(createPage(page, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePage)
