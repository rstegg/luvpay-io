import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { Card, Image } from 'semantic-ui-react'
import CreatePageForm from './form'

import { createPage, uploadPageImage } from '../../redux/actions/pages'

import Dropzone from '../../components/Dropzone'

const Avatar = ({image, uploadPageImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadPageImage}>
    <Image src={image || '/images/postholder.png'} />
  </Dropzone>

const CreatePage = ({ user, page, createPage, uploadPageImage, image }) =>
  !user.isAuthenticated ?
    <Redirect to='/login' from='/pages/new' />
  :
  page.isCreated ?
    <Redirect to='/pages' from='/pages/new' />
  :
    <Card>
      <Avatar image={image || page.image} uploadPageImage={img => uploadPageImage(img[0], user)} />
      <Card.Content>
        <Card.Header>New Page</Card.Header>
        <Card.Description>
          <CreatePageForm
            page={page}
            onSubmit={page => createPage({...page, image: page.image}, user)}
          />
        </Card.Description>
      </Card.Content>
    </Card>


const mapStateToProps = ({user, pages}) =>
({
  user,
  page: pages.new,
  image: pages.image
})

const mapDispatchToProps = dispatch =>
({
  createPage: (page, user) => dispatch(createPage(page, user)),
  uploadPageImage: (img, user) => dispatch(uploadPageImage(img, user)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreatePage)
