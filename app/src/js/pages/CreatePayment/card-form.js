import React from 'react'

import { Field, reduxForm } from 'redux-form'

import { validate, validNumber, validExpiry, validCVC } from './validators'

import InputField from '../../elements/InputField'
import MaskedInput from 'react-maskedinput'

import { Form, Button, Label, Loader } from 'semantic-ui-react'

const ExpiryField = ({ input: { value, onChange }, meta: { asyncValidating, touched, error } }) =>
  <Form.Field>
    {asyncValidating && <Loader active inline />}
    <Form.Input
      label='Expiry'
      placeholder='MM/YY'
      control={MaskedInput}
      mask='11/11'
      value={value}
      onChange={onChange} />
      {touched && error && <Label basic color='red' pointing>{error}</Label>}
  </Form.Field>

const NumberField = ({ input: { value, onChange }, meta: { touched, error } }) =>
  <Form.Field>
    <Form.Input
      label='Card number'
      placeholder='****-****-****-****'
      control={MaskedInput}
      mask='1111-1111-1111-1111'
      value={value}
      onChange={onChange} />
    {touched && error && <Label basic color='red' pointing>{error}</Label>}
  </Form.Field>

const CardForm = ({handleSubmit, previousPage}) =>
  <Form onSubmit={handleSubmit}>
    <Field component={InputField} name='name' label='Name on card' control='input' placeholder='Full name' />
    <Field component={NumberField} name='number' validate={[validNumber]} label='Card Number' control='input' placeholder='Number' />
    <Form.Group widths='equal'>
      <Field component={ExpiryField} name='expiry' validate={[validExpiry]} control='input' />
      <Field component={InputField} name='cvc' validate={[validCVC]} label='CVC' control='input' placeholder='CVC' />
    </Form.Group>
    <Field component={InputField} name='address_zip' label='Zip' placeholder='Zip code' />
      <Button onClick={previousPage} secondary>Back</Button>
      <Button type='submit' primary>Next</Button>
  </Form>

export default reduxForm({
  form: 'newPayment',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(CardForm)
