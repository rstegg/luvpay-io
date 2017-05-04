import React from 'react'

import { Field, reduxForm } from 'redux-form'

import { validate } from './validators'

import InputField from '../../elements/InputField'

import { Form } from 'semantic-ui-react'

const CheckboxField = ({ input: { value, onChange } }) =>
  <Form.Checkbox
    label='Public'
    toggle
    checked={!!value}
    onChange={(_,data) => onChange(data.checked)} />

const AmountForm = ({handleSubmit, page}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' type='text' label='Organization or project name' control='input' placeholder='Name' />
    <Field component={CheckboxField} name='is_public' />
    <Form.Button type='submit' primary>Create</Form.Button>
  </Form>

export default reduxForm({
  form: 'newPage',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(AmountForm)
