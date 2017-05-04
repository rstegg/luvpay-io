import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Image, Grid, Header, Label, Button } from 'semantic-ui-react'
import { Field, reduxForm, formValueSelector } from 'redux-form'

import PageMenu from '../../components/PostMenu'
import Dropzone from '../../components/Dropzone'
import InputField from '../../elements/InputField'

import { editPage, uploadPageImage, editPageField } from '../../redux/actions/pages'

const Avatar = ({image, uploadPageImage}) =>
  <Dropzone className='ui image editable' onDrop={uploadPageImage}>
    <Image src={image || '/images/postholder.png'} />
  </Dropzone>

const EditField = ({children, onClick, isEditing, placeholder, label, name, value, type, onSubmit}) =>
  isEditing ?
  <Field
    component={InputField}
    type={type || 'text'}
    label={label}
    placeholder={placeholder}
    name={name}
    onKeyUp={e => {
      if(e.keyCode === 13) {
        onSubmit(e.target.value)
      }}
    } />
  :
  <div onClick={onClick}>
    {children}
  </div>

const AdminView = ({
  editPage,
  editPageField,
  uploadPageImage,
  image,
  page,
  user,
  deletePage
}) =>
  <Grid celled className='main-container'>
    <Grid.Row>
      <Grid.Column width={3}>
        <Avatar image={image || page.image} uploadPageImage={img => uploadPageImage(img[0], user)} />
      </Grid.Column>
      <Grid.Column width={10}>
        <EditField
          isEditing={page.focused === 'description'}
          placeholder='Description' name='description'
          onClick={() => editPageField('description')} onSubmit={v => editPage({...page, description: v}, user)}>
          <Header as='h4'>{page.description || 'Add a description'}</Header>
        </EditField>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row>
      <Grid.Column width={3}>
        <EditField
          isEditing={page.focused === 'name'}
          placeholder='Name' name='name'
          onClick={() => editPageField('name')} onSubmit={v => editPage({...page, name: v}, user)}>
          <Header as='h1'>{page.name}</Header>
        </EditField>
        <Button onClick={() => deletePage(page.id, user)} basic color='red'>Delete Page</Button>
      </Grid.Column>
      <Grid.Column width={10}>
        {page.user &&
          <Label to={`/user/${page.user.username}`} from={`/page/${page.slug}`} as={NavLink} basic image>
            <img src={page.user.image || '/images/placeholder.png'} alt={user.username} /> {page.user.username}
          </Label>
        }
      </Grid.Column>
      <Grid.Column width={3}>
        <PageMenu url={`https://kuwau.com/page/${page.slug}`} pageId={page.id} />
      </Grid.Column>
    </Grid.Row>
  </Grid>


const ConnectedAdminView = reduxForm({
  form: 'editPage',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  // validate
})(AdminView)

const selector = formValueSelector('editPage')

const mapStateToProps = state =>
({
  user: state.user,
  page: state.pages.current,
  image: state.pages.image,
  initialValues: state.pages.current
})

const mapDispatchToProps = dispatch =>
({
  editPage: (page, user) => dispatch(editPage(page, user)),
  uploadPageImage: (img, user) => dispatch(uploadPageImage(img, user)),
  editPageField: field => dispatch(editPageField(field))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedAdminView)
