import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import RouterButton from '../../elements/RouterButton'
import ArticlesList from './list'

import { fetchArticles, setCurrentArticle, refreshArticles } from '../../redux/actions/articles'

class Articles extends Component {
  componentDidMount() {
    if(this.props.user.isAuthenticated) {
      this.props.fetchArticles(this.props.user)
      this.props.refreshArticles()
    }
  }
  render() {
    const { articles, setCurrentArticle } = this.props
    if(!this.props.user.isAuthenticated) {
      return <Redirect to='/login' from='/articles' />
    }
    return (
      <Card className='articles'>
        <Card.Content className='card__list'>
          <Card.Header>Articles</Card.Header>
          <Card.Description>
            <ArticlesList
              articles={articles}
              setCurrentArticle={setCurrentArticle}
             />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <RouterButton to='/articles/new' from='/articles' label='start an article' />
        </Card.Content>
      </Card>
    )
  }
}
const mapStateToProps = ({articles, user}) =>
({
  articles: articles.list,
  user
})

const mapDispatchToProps = dispatch =>
({
  fetchArticles: user => dispatch(fetchArticles(user)),
  setCurrentArticle: article => dispatch(setCurrentArticle(article)),
  refreshArticles: () => dispatch(refreshArticles()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Articles)
