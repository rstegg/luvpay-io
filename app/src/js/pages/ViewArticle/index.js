import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Label } from 'semantic-ui-react'
import RootLayout from '../../components/layouts/Root'
import ArticleMenu from '../../components/ArticleMenu'

import { fetchSingleArticle } from '../../redux/actions/articles'

class ViewArticle extends Component {
  componentWillMount() {
    const { match: { params }, user } = this.props
    this.props.fetchSingleArticle(params.id, user)
  }
  render() {
    const { article, user } = this.props
    if(!article) {
      return <Redirect to='/' />
    }
    return (
      <RootLayout>
        <div className='pay--menu'>
          <ArticleMenu />
        </div>
        <Card>
          <Card.Content>
            <Card.Header>{user.name}</Card.Header>
            <Card.Meta>Paid - ${article.amount}</Card.Meta>
            <Card.Description>
              <Label basic>Note: {article.name}</Label>
            </Card.Description>
          </Card.Content>
        </Card>
      </RootLayout>
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
