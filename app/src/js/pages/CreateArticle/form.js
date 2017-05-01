import React, { Component } from 'react'

import AmountForm from './amount-form'
import CardForm from './card-form'

export default class CreateArticleForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      article: 1
    }
  }
  nextArticle() {
    this.setState({ article: 2 })
  }
  previousArticle() {
    this.setState({ article: 1 })
  }
  render() {
    const { onSubmit, post } = this.props
    const { article } = this.state
    return (
      <div>
        {article === 1 && <AmountForm onSubmit={() => this.nextArticle()} post={post} />}
        {article === 2 && <CardForm previousArticle={() => this.previousArticle()} onSubmit={onSubmit} />}
      </div>
    )
  }
}
