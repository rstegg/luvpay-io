import React from 'react'
import { NavLink } from 'react-router-dom'

import { Feed, Header } from 'semantic-ui-react'

const PageItem = ({className, onClick, page}) =>
  <Feed.Event as={NavLink} to={`/page/${page.slug}`}>
    <Feed.Label>
      <img src={page.image || '/images/postholder.png'} alt={page.name} />
    </Feed.Label>
    <Feed.Content>
      <Header>{page.name}</Header>
    </Feed.Content>
  </Feed.Event>

export default PageItem
