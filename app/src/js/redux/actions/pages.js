export const refreshPages = () =>
({
  type: 'REFRESH_PAGES'
})

export const fetchPages = user =>
({
  type: 'FETCH_PAGES',
  payload: {
    token: user.token
  }
})

export const onFetchPagesSuccess = res =>
({
  type: 'FETCH_PAGES_SUCCESS',
  payload: {
    pages: res.body.pages
  }
})

export const fetchSinglePage = (id, user) =>
({
  type: 'FETCH_SINGLE_PAGE',
  payload: {
    pageId: id,
    token: user.token
  }
})

export const onFetchSinglePageSuccess = res =>
({
  type: 'FETCH_SINGLE_PAGE_SUCCESS',
  payload: {
    page: res.body.page
  }
})

export const createPage = (page, user) =>
({
  type: 'CREATE_PAGE',
  payload: {
    page,
    user
  }
})

export const onCreatePageSuccess = res =>
({
  type: 'CREATE_PAGE_SUCCESS',
  payload: {
    page: res.body.page
  }
})

export const setCurrentPage = page =>
({
  type: 'SET_CURRENT_PAGE',
  payload: {
    page
  }
})
