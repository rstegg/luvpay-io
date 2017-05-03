import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import EditProfileForm from './form'

import { editPage, uploadPageImage } from '../../redux/actions/pages'



import Dropzone from '../../components/Dropzone'

const Avatar = ({image, uploadPageImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadPageImage}>
    <Image src={image || '/images/pageholder.png'} />
  </Dropzone>

const EditProfile = ({ user, page, image, editPage, uploadPageImage }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/pages/edit' />
  : page.isEdited ?
    <Redirect to='/pages' from='/pages/edit' />
  :
  
    <Card>
      <Avatar image={image || page.image} uploadPageImage={img => uploadPageImage(img[0], user)} />
      <Card.Content>
        <Card.Header>Editing {page.name}</Card.Header>
        <Card.Description>
          <EditProfileForm onSubmit={values => editPage(({...values, image: image || page.image, id: page.id}), user)} />
        </Card.Description>
      </Card.Content>
    </Card>
  

const mapStateToProps = ({user, pages}) =>
({
  user,
  page: pages.current,
  image: pages.image
})

const mapDispatchToProps = dispatch =>
({
  editPage: (page, user) => dispatch(editPage(page, user)),
  uploadPageImage: (img, user) => dispatch(uploadPageImage(img, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile)
