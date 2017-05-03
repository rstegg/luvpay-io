import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import EditProfileForm from './form'

import { editPost, uploadPostImage } from '../../redux/actions/posts'



import Dropzone from '../../components/Dropzone'

const Avatar = ({image, uploadPostImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadPostImage}>
    <Image src={image || '/images/postholder.png'} />
  </Dropzone>

const EditProfile = ({ user, post, image, editPost, uploadPostImage }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/posts/edit' />
  : post.isEdited ?
    <Redirect to='/posts' from='/posts/edit' />
  :
  
    <Card>
      <Avatar image={image || post.image} uploadPostImage={img => uploadPostImage(img[0], user)} />
      <Card.Content>
        <Card.Header>Editing {post.name}</Card.Header>
        <Card.Description>
          <EditProfileForm onSubmit={values => editPost(({...values, image: image || post.image, id: post.id}), user)} />
        </Card.Description>
      </Card.Content>
    </Card>
  

const mapStateToProps = ({user, posts}) =>
({
  user,
  post: posts.current,
  image: posts.image
})

const mapDispatchToProps = dispatch =>
({
  editPost: (post, user) => dispatch(editPost(post, user)),
  uploadPostImage: (img, user) => dispatch(uploadPostImage(img, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile)
