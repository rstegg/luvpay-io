import React from 'react'
import { Form } from 'semantic-ui-react'

const InputField = ({ input: { value, onChange }, name, label, placeholder }) =>
  <Form.TextArea
    label={label}
    autoHeight={true}
    name={name}
    placeholder={placeholder || label}
    value={value}
    onChange={onChange} />

export default InputField
