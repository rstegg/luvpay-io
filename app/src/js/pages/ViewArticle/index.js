import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Label } from 'semantic-ui-react'

import ArticleMenu from '../../components/ArticleMenu'

import { fetchSingleArticle } from '../../redux/actions/articles'

class ViewArticle extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    this.props.fetchSingleArticle(params.id, user)
  }
  render() {
    const { article } = this.props
    if(!article) {
      return <Redirect to='/' />
    }
    return (
      <Card>
        <ArticleMenu />
        <Card.Content>
          <Card.Header>{article.name}</Card.Header>
          <Card.Meta>{article.user.username}</Card.Meta>
          <Card.Meta as='a' to={article.url}>{article.url}</Card.Meta>
          <Card.Description>
            <Label basic>{article.description}</Label>
          </Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

const mapStateToProps = ({articles, user}) =>
({
  article: articles.current,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchSingleArticle: (articleId, user) => dispatch(fetchSingleArticle(articleId, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewArticle)
