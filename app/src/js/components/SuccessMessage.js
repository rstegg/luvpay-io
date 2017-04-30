import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'

import { resetSignup } from '../redux/actions/signup'
import { createPost } from '../redux/actions/posts'

class SuccessMessage extends Component {
  componentWillUpdate() {
    if(this.props.visible) {
      if(this.props.post.isSaved) {
        this.props.createPost(this.props.post, this.props.user)
      }
    }
  }
  render() {
    const { visible, resetSignup } = this.props
    return (
      <Modal open={visible} onClose={resetSignup} basic size='small'>
        <Header icon='mail' content='Success!' />
      <Modal.Content>
        <h3>Check your email for verification.</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={resetSignup} inverted>
          <Icon name='checkmark' />
        </Button>
      </Modal.Actions>
    </Modal>
    )
  }
}

const mapStateToProps = ({user, posts}) =>
({
  user,
  post: posts.free,
  visible: user.isRegistered
})

const mapDispatchToProps = dispatch =>
({
  resetSignup: () => dispatch(resetSignup()),
  createPost: (post, user) => dispatch(createPost(post, user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuccessMessage)
