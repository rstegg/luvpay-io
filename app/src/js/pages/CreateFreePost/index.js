import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import CreateFreePostForm from './form'

import { saveFreePost, uploadFreePostImage } from '../../redux/actions/posts'

import RootLayout from '../../components/layouts/Root'

import Dropzone from '../../components/Dropzone'

const Avatar = ({image, uploadFreePostImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadFreePostImage}>
    <Image src={image || '/images/postholder.png'} />
  </Dropzone>

const CreateFreePost = ({ user, post, saveFreePost, uploadFreePostImage, history }) =>
  user.isAuthenticated ?
    <Redirect to='/posts/new' from='/posts/try' />
  :
  post.isSaved ?
    <Redirect to='/signup' from='/posts/try' />
  :
  <RootLayout>
    <Card>
      <Avatar image={post.image} uploadFreePostImage={img => uploadFreePostImage(img[0])} />
      <Card.Content>
        <Card.Header>New Post</Card.Header>
        <Card.Description>
          <CreateFreePostForm onSubmit={values => {
            saveFreePost(({...values, image: post.image}), user)
          }} />
        </Card.Description>
      </Card.Content>
    </Card>
  </RootLayout>

const mapStateToProps = ({user, posts}) =>
({
  user,
  post: posts.free
})

const mapDispatchToProps = dispatch =>
({
  saveFreePost: (post, user) => dispatch(saveFreePost(post, user)),
  uploadFreePostImage: (img) => dispatch(uploadFreePostImage(img))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateFreePost)
