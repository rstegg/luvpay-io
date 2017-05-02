import React from 'react'

import { Field, reduxForm } from 'redux-form'

import { validate } from './validators'

import InputField from '../../elements/InputField'

import { Form, Button } from 'semantic-ui-react'

const AmountForm = ({handleSubmit, page}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' type='text' label='Organization or project name' control='input' placeholder='Name' />
    <Button type='submit' primary>Next</Button>
  </Form>

export default reduxForm({
  form: 'newPage',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(AmountForm)
