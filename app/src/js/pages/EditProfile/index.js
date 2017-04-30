import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import EditProfileForm from './form'

import { editProfile, uploadAvatar } from '../../redux/actions/profile'

import RootLayout from '../../components/layouts/Root'

import Dropzone from '../../components/Dropzone'

const Avatar = ({image, name, className, uploadAvatar}) =>
  <Dropzone className='ui image editable profimg' onDrop={uploadAvatar}>
    <Image src={image || '/images/placeholder.png'} />
  </Dropzone>

const EditProfile = ({ user, profile, editProfile, uploadAvatar }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/profile/edit' />
  : profile.isEdited ?
    <Redirect to={`/user/${user.username}`} from='/profile/edit' />
  :
  <RootLayout>
    <Card>
      <Avatar image={user.image} name={`${user.name}`} uploadAvatar={img => uploadAvatar(img[0], user)} />
      <Card.Content>
        <Card.Header>Edit Profile</Card.Header>
        <Card.Description>
          <EditProfileForm
            onSubmit={profile => editProfile(profile, user)} />
        </Card.Description>
      </Card.Content>
    </Card>
  </RootLayout>

const mapStateToProps = ({user, profile}) =>
({
  user,
  profile
})

const mapDispatchToProps = dispatch =>
({
  editProfile: (profile, user) => dispatch(editProfile(profile, user)),
  uploadAvatar: (img, user) => dispatch(uploadAvatar(img, user))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProfile)
