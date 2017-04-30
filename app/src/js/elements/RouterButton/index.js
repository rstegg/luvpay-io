import React from 'react'
import { NavLink } from 'react-router-dom'
import { Label } from 'semantic-ui-react'

const RouterButton = ({to, from, className, activeClassName, prefix, label}) =>
  <NavLink to={to} from={from} className={className || 'router--link'} activeClassName={activeClassName || 'link--active'}>
      {prefix} <Label basic>{label}</Label>
  </NavLink>

export default RouterButton
