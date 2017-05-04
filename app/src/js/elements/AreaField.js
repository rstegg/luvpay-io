import React from 'react'
import { Form } from 'semantic-ui-react'

const AreaField = ({ input: { value, onChange }, onKeyUp, name, label, placeholder }) =>
  <Form.TextArea
    label={label}
    autoHeight={true}
    name={name}
    placeholder={placeholder || label}
    value={value}
    onChange={onChange}
    onKeyUp={onKeyUp} />

export default AreaField
