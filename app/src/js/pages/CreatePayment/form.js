import React, { Component } from 'react'

import AmountForm from './amount-form'
import CardForm from './card-form'

export default class CreatePaymentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1
    }
  }
  nextPage() {
    this.setState({ page: 2 })
  }
  previousPage() {
    this.setState({ page: 1 })
  }
  render() {
    const { onSubmit, post } = this.props
    const { page } = this.state
    return (
      <div>
        {page === 1 && <AmountForm onSubmit={() => this.nextPage()} post={post} />}
        {page === 2 && <CardForm previousPage={() => this.previousPage()} onSubmit={onSubmit} />}
      </div>
    )
  }
}
