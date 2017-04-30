import React from 'react'
import { Form, Input, Label, Icon } from 'semantic-ui-react'

import NumberInput from 'react-number-input'

const CurrencyField = ({ input: { value, onChange }, meta: { touched, error }, type, name, placeholder, label, disabled }) =>
  <Form.Field>
      <label>{label}</label>
    <Input icon iconPosition='left' fluid>
      <Icon name='dollar' />
      <NumberInput type='tel' onChange={onChange} value={value} name={name} min={0} max={10000} format="0,0[.]00" placeholder={placeholder || label} disabled={disabled || false} />
      {touched && error && <Label basic color='red' pointing>{error}</Label>}
    </Input>
  </Form.Field>

export default CurrencyField
