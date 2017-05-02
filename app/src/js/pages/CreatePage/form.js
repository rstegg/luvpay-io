import React, { Component } from 'react'

import NameForm from './name-form'
import DetailsForm from './details-form'

export default class CreatePageForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageNum: 1
    }
  }
  nextPage() {
    this.setState({ pageNum: 2 })
  }
  previousPage() {
    this.setState({ pageNum: 1 })
  }
  render() {
    const { onSubmit, page } = this.props
    const { pageNum } = this.state
    return (
      <div>
        {pageNum === 1 && <NameForm onSubmit={() => this.nextPage()} page={page} />}
        {pageNum === 2 && <DetailsForm previousPage={() => this.previousPage()} onSubmit={onSubmit} />}
      </div>
    )
  }
}
