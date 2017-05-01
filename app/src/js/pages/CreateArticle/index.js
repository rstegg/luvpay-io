import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import CreateArticleForm from './form'

import { createArticle } from '../../redux/actions/articles'

import RootLayout from '../../components/layouts/Root'

const CreateArticle = ({ user, article, createArticle }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/articles/new' />
  :
  article.isCreated ?
    <Redirect to='/articles' from='/articles/new' />
  :
    <RootLayout>
      <Card>
        <Card.Content>
          <Card.Header>New Article</Card.Header>
          <Card.Description>
            <CreateArticleForm
              article={article}
              onSubmit={article => createArticle(article, user)}
            />
          </Card.Description>
        </Card.Content>
      </Card>
    </RootLayout>

const mapStateToProps = ({user, articles}) =>
({
  user,
  article: articles.new
})

const mapDispatchToProps = dispatch =>
({
  createArticle: (article, user) => dispatch(createArticle(article, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateArticle)
