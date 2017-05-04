import React from 'react'

import PostItem from '../../elements/PostItem'
import { Feed } from 'semantic-ui-react'

const PostsList =
({
  posts,
  setCurrentPost
}) =>
    <Feed>
      {posts.length ? posts.map((post, i) =>
        <PostItem key={`post-${i}`} post={post} onClick={() => setCurrentPost(post)} />
      ) :
      <Feed.Event>
        <Feed.Label image='/images/postholder.png' />
        <Feed.Content content='No Posts!' />
      </Feed.Event>
      }
  </Feed>





export default PostsList
