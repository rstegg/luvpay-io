import React from 'react'

import ArticleItem from '../../elements/ArticleItem'

const ArticlesList =
({
  articles,
  setCurrentArticle
}) =>
  <ul className='articles--list'>
    {
      articles.length ? articles.map((article, i) =>
        <ArticleItem key={`article-${i}`} article={article} onClick={() => setCurrentArticle(article)} />
      )
      :
      <li>
        No Articles!
      </li>
    }
  </ul>

export default ArticlesList
