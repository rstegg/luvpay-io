import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Label } from 'semantic-ui-react'
import { push } from 'react-router-redux'

import FeedList from './list'

import { fetchFeed } from '../../redux/actions/feed'
import { setCurrentPost } from '../../redux/actions/posts'

import RootLayout from '../../components/layouts/Root'

class Feed extends Component {
  componentWillMount() {
    this.props.fetchFeed(this.props.user)
  }
  render() {
    const { setCurrentPost, toSettings, user } = this.props
    return (
      <RootLayout>
        <Card className='posts'>
          <Card.Content>
            <Card.Header>Your Feed</Card.Header>
          </Card.Content>
          <Card.Content>
            <FeedList
              feed={this.props.feed || []}
              setCurrentPost={setCurrentPost}
            />
          </Card.Content>
          <Card.Content extra>
            <button onClick={() => toSettings(user.username)}>
              <Label basic>Feed settings</Label>
            </button>
          </Card.Content>
        </Card>
      </RootLayout>
    )
  }
}

const mapStateToProps = ({feed, user}) =>
({
  user,
  feed: feed.list
})

const mapDispatchToProps = dispatch =>
({
  fetchFeed: user => dispatch(fetchFeed(user)),
  toSettings: username => dispatch(push(`/user/${username}`)),
  setCurrentPost: post => dispatch(setCurrentPost(post))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed)
