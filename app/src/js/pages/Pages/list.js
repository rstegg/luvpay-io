import React from 'react'

import PageItem from '../../elements/PageItem'
import { Feed } from 'semantic-ui-react'

const PagesList =
({
  pages,
  setCurrentPage
}) =>
  <Feed>
    {pages.length ? pages.map((page, i) =>
      <PageItem key={`page-${i}`} page={page} onClick={() => setCurrentPage(page)} />
    ) :
    <Feed.Event>
      <Feed.Label image='/images/postholder.png' />
      <Feed.Content content='No Pages!' />
    </Feed.Event>
    }
  </Feed>

export default PagesList
