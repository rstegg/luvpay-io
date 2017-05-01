export const refreshArticles = () =>
({
  type: 'REFRESH_ARTICLES'
})

export const fetchArticles = user =>
({
  type: 'FETCH_ARTICLES',
  payload: {
    token: user.token
  }
})

export const onFetchArticlesSuccess = res =>
({
  type: 'FETCH_ARTICLES_SUCCESS',
  payload: {
    articles: res.body.articles
  }
})

export const fetchSingleArticle = (id, user) =>
({
  type: 'FETCH_SINGLE_ARTICLE',
  payload: {
    articleId: id,
    token: user.token
  }
})

export const onFetchSingleArticleSuccess = res =>
({
  type: 'FETCH_SINGLE_ARTICLE_SUCCESS',
  payload: {
    article: res.body.article
  }
})

export const createArticle = (article, user) =>
({
  type: 'CREATE_ARTICLE',
  payload: {
    article,
    user
  }
})

export const onCreateArticleSuccess = res =>
({
  type: 'CREATE_ARTICLE_SUCCESS',
  payload: {
    article: res.body.article
  }
})

export const setCurrentArticle = article =>
({
  type: 'SET_CURRENT_ARTICLE',
  payload: {
    article
  }
})
