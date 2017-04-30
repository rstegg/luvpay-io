import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card } from 'semantic-ui-react'
import CreatePaymentForm from './form'

import { createPayment } from '../../redux/actions/payments'
import { fetchSinglePost } from '../../redux/actions/posts'

import RootLayout from '../../components/layouts/Root'

class CreatePayment extends Component {
  componentWillMount() {
    if(this.props.user.isAuthenticated) {
      this.props.fetchSinglePost(this.props.match.params.id, this.props.user)
    }
  }
  render() {
    const { user, post, payment, createPayment } = this.props
    if(!user.isAuthenticated) {
      return <Redirect to='/login' from='/payments/new' />
    }
    if(payment.isCreated) {
      return <Redirect to='/payments' from='/payments/new' />
    }
    return (
      <RootLayout>
        <Card>
          <Card.Content>
            <Card.Header>New Payment</Card.Header>
            <Card.Description>
              <CreatePaymentForm
                post={this.props.post}
                onSubmit={payment => {
                  if(post.amount_type === 'fixed') {
                    payment.amount = post.amount
                  }
                  createPayment(payment, user, post.id)
                }}
              />
            </Card.Description>
          </Card.Content>
        </Card>
      </RootLayout>
    )
  }
}

const mapStateToProps = ({user, posts, payments}) =>
({
  user,
  post: posts.current,
  payment: payments.new
})

const mapDispatchToProps = dispatch =>
({
  createPayment: (payment, user, postId) => dispatch(createPayment(payment, user, postId)),
  fetchSinglePost: (id, user) => dispatch(fetchSinglePost(id, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePayment)
