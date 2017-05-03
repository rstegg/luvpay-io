import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import CreatePostForm from './form'

import { createPost, uploadPostImage } from '../../redux/actions/posts'

import Dropzone from '../../components/Dropzone'

const Avatar = ({image, uploadPostImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadPostImage}>
    <Image src={image || '/images/postholder.png'} />
  </Dropzone>

const CreatePost = ({ user, post, image, createPost, uploadPostImage }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/posts/new' />
  : post.isCreated ?
    <Redirect to='/posts' from='/posts/new' />
  :
    <Card>
      <Avatar image={image || post.image} uploadPostImage={img => uploadPostImage(img[0], user)} />
      <Card.Content>
        <Card.Header>New Post</Card.Header>
        <Card.Description>
          <CreatePostForm onSubmit={values => createPost(({...values, image: post.image}), user)} />
        </Card.Description>
      </Card.Content>
    </Card>

const mapStateToProps = ({user, posts}) =>
({
  user,
  post: posts.new,
  image: posts.image
})

const mapDispatchToProps = dispatch =>
({
  createPost: (post, user) => dispatch(createPost(post, user)),
  uploadPostImage: (img, user) => dispatch(uploadPostImage(img, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePost)
