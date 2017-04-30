import React from 'react'

import { Field, reduxForm } from 'redux-form'
import { Form } from 'semantic-ui-react'

import InputField from '../../elements/InputField'
import AreaField from '../../elements/AreaField'

const PostMenuForm = ({handleSubmit}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' label='Name' placeholder='Name' />
    <Field component={InputField} type='email' name='email' label='To' placeholder='Email' />
    <Field component={AreaField} name='message' label='Custom Message' placeholder='Body' />
    <Form.Button type='submit' primary>Send</Form.Button>
  </Form>

export default reduxForm({
  form: 'postInvite'
})(PostMenuForm)
