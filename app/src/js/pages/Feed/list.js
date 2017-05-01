import React from 'react'

import PostsItem from '../../elements/PostsItem'
import { Feed } from 'semantic-ui-react'

const FeedList =
({
  feed,
  setCurrentPost
}) =>
    <Feed>
      {
        feed.length ? feed.map((post, i) =>
        <PostsItem key={`post-${i}`} post={post} onClick={() => setCurrentPost(post)} />
      ) :
      <Feed.Event>
        <Feed.Label image='/images/postholder.png' />
        <Feed.Content content='Your feed is empty!' />
      </Feed.Event>
      }
    </Feed>

export default FeedList
