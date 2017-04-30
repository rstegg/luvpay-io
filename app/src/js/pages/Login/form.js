import React from 'react'

import { Field, reduxForm } from 'redux-form'

import { Form } from 'semantic-ui-react'

const InputField = ({ input: { value, onChange }, name, type, label, control, placeholder }) =>
  <Form.Field
    value={value}
    onChange={onChange}
    name={name}
    type={type}
    label={label}
    control={control}
    placeholder={placeholder} />

const LoginForm = ({handleSubmit, submitting}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name="username" type="text" label='Username' control='input' placeholder='Username' />
    <Field component={InputField} name="password" type="password" label='Password' control='input' placeholder='Password' />
    <Form.Button loading={submitting} type="submit" primary>Log in</Form.Button>
  </Form>

export default reduxForm({
  form: 'login'
})(LoginForm)
