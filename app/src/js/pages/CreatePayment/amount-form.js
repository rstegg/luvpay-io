import React from 'react'

import { Field, reduxForm } from 'redux-form'

import { validate } from './validators'

import AreaField from '../../elements/AreaField'
import CurrencyField from '../../elements/CurrencyField'

import { Form, Button } from 'semantic-ui-react'

const AmountForm = ({handleSubmit, post}) =>
  <Form onSubmit={handleSubmit}>
    {post.amount_type === 'fixed' && <Field component={CurrencyField}  name='amount' type='text' label='Amount' value={post.amount} placeholder={post.amount} disabled={true} />}
    {post.amount_type === 'open' && <Field component={CurrencyField} name='amount' type='text' label='Amount' placeholder='0.00' />}
    <Field component={AreaField} name='note' type='text' label='Note' control='input' placeholder='Note' />
    <Button type='submit' primary>Next</Button>
  </Form>

export default reduxForm({
  form: 'newPayment',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(AmountForm)
