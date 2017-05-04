import React from 'react'
import { NavLink } from 'react-router-dom'

import { Feed, Image, Label } from 'semantic-ui-react'
import moment from 'moment'

import { path } from 'ramda'

const postUsername = path(['user', 'username'])
const postUserImage = path(['user', 'image'])

const formatDate = date => moment(date, 'YYYY-MM-DD HH:mm Z').fromNow()

const PostItem = ({className, onClick, post}) =>
    <Feed.Event>
      <Feed.Label className='post--img' as={NavLink} to={`/post/${post.slug}`}>
        <Image src={post.image || '/images/postholder.png'} alt={post.name} avatar />
      </Feed.Label>
      <Feed.Content>
        <Feed.Date>{formatDate(post.createdAt)}</Feed.Date>
        <Feed.Summary>
           {post.name}
        </Feed.Summary>
        <Feed.Extra text>
          <Label as={NavLink} to={`/user/${postUsername(post)}`} basic image>
            <img src={postUserImage(post) || '/images/placeholder.png'} alt={postUsername(post)} /> {postUsername(post)}
          </Label>
        </Feed.Extra>
      </Feed.Content>
    </Feed.Event>

export default PostItem
