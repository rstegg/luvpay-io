import React from 'react'
import { NavLink } from 'react-router-dom'
import { Label } from 'semantic-ui-react'

const PageItem = ({className, onClick, page}) =>
  <NavLink to={`/page/${page.name}`} className={className || 'list--link'}>
    <Label tag color='teal'>{page.name}</Label>
  </NavLink>

export default PageItem
