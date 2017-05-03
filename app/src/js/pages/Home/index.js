import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card } from 'semantic-ui-react'
import FeedList from './list'

import { fetchPublicFeed } from '../../redux/actions/feed'
import { setCurrentPost } from '../../redux/actions/posts'


import RouterButton from '../../elements/RouterButton'

class Home extends Component {
  componentWillMount() {
    this.props.fetchPublicFeed()
  }
  render() {
    const { setCurrentPost } = this.props
    return (
      
        <Card className='posts'>
          <Card.Content>
            <Card.Header>Public Posts</Card.Header>
          </Card.Content>
          <Card.Content>
            <FeedList
              feed={this.props.feed || []}
              setCurrentPost={setCurrentPost}
            />
          </Card.Content>
          <Card.Content extra>
            <RouterButton to='/posts/new' from='/' label='start a post' />
          </Card.Content>
        </Card>
      
    )
  }
}

const mapStateToProps = ({feed}) =>
({
  feed: feed.public
})

const mapDispatchToProps = dispatch =>
({
  fetchPublicFeed: () => dispatch(fetchPublicFeed()),
  setCurrentPost: (post) => dispatch(setCurrentPost(post))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
