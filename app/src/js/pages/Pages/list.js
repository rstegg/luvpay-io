import React from 'react'

import PageItem from '../../elements/PageItem'

const PagesList =
({
  pages,
  setCurrentPage
}) =>
  <ul className='pages--list'>
    {
      pages.length ? pages.map((page, i) =>
        <PageItem key={`page-${i}`} page={page} onClick={() => setCurrentPage(page)} />
      )
      :
      <li>
        No Pages!
      </li>
    }
  </ul>

export default PagesList
