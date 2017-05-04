import React from 'react'
import { Input } from 'semantic-ui-react'

const EditorField = ({ input, meta: { asyncValidating, touched, error }, onKeyUp, fluid, type, label, placeholder }) =>
  <Input fluid type={type || 'text'} {...input} label={label} onKeyUp={onKeyUp} placeholder={placeholder || label} />

export default EditorField
