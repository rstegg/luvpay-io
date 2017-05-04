import React from 'react'
import { Form, Label } from 'semantic-ui-react'

const InputField = ({ input, meta: { asyncValidating, touched, error }, type, label, placeholder }) =>
  <Form.Field>
    <label>{label}</label>
    <div className={asyncValidating ? 'ui right icon input loading' : 'ui input'}>
      <input type={type || 'text'} {...input} placeholder={placeholder || label} />
      {asyncValidating && <i className='search icon'></i>}
    </div>
    {touched && error && <Label basic color='red' pointing>{error}</Label>}
  </Form.Field>


export default InputField
