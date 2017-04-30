import React from 'react'
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form'
import InputField from '../../elements/InputField'
import { Form } from 'semantic-ui-react'

import AreaField from '../../elements/AreaField'
import MaskedInput from 'react-maskedinput'

import { validate } from './validators'

const DobField = ({ input: { value, onChange } }) =>
  <Form.Input
    label='Date of Birth'
    placeholder='MM/DD/YYYY'
    control={MaskedInput}
    mask='11/11/1111'
    value={value}
    onChange={onChange} />

const EditProfileForm = ({handleSubmit}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} label='Name' name='name' placeholder='Name' />
    <Field component={InputField} label='Username' name='username' />
    <Field component={AreaField} label='Bio' name='bio' />
    <Field component={DobField} name='dob' />
    <Form.Button type='submit' primary>Save</Form.Button>
  </Form>

const connectedEditProfileForm = reduxForm({
  form: 'editProfile',
  validate
})(EditProfileForm)

const mapStateToProps = ({user}) =>
({
  initialValues: user
})

export default connect(mapStateToProps)(connectedEditProfileForm)
