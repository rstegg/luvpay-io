import React from 'react'
import { NavLink } from 'react-router-dom'
import { Label } from 'semantic-ui-react'

const ArticleItem = ({className, onClick, article}) =>
  <NavLink to={`/article/${article.name}`} className={className || 'list--link'}>
    <Label tag color='teal'>{article.name}</Label>
  </NavLink>

export default ArticleItem
