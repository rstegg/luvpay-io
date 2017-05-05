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

export const editPageField = field =>
({
  type: 'EDIT_PAGE_FIELD',
  payload: {
    field
  }
})

export const editPage = (page, user) =>
({
  type: 'EDIT_PAGE',
  payload: {
    page,
    user
  }
})

export const onEditPageSuccess = res =>
({
  type: 'EDIT_PAGE_SUCCESS',
  payload: {
    page: res.body.page
  }
})

export const deletePage = (pageId, user) =>
({
  type: 'DELETE_PAGE',
  payload: {
    pageId,
    user
  }
})

export const onDeletePageSuccess = res =>
({
  type: 'DELETE_PAGE_SUCCESS',
  payload: {
    page: res.body.page
  }
})

export const joinPage = (pageId, user) =>
({
  type: 'JOIN_PAGE',
  payload: {
    pageId,
    user
  }
})

export const onJoinPageSuccess = res =>
({
  type: 'JOIN_PAGE_SUCCESS',
  payload: {
    page: res.body.page
  }
})

export const uploadPageImage = (image, {token}) =>
({
  type: 'UPLOAD_PAGE_IMAGE',
  payload: {
    image,
    token
  }
})

export const onUploadPageImageSuccess = res =>
({
  type: 'UPLOAD_PAGE_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const uploadEditPageImage = (image, page, user) =>
({
  type: 'UPLOAD_EDIT_PAGE_IMAGE',
  payload: {
    image,
    token: user.token,
    pageId: page.id
  }
})

export const onUploadEditPageImageSuccess = res =>
({
  type: 'UPLOAD_EDIT_PAGE_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})


export const setCurrentPage = page =>
({
  type: 'SET_CURRENT_PAGE',
  payload: {
    page
  }
})
