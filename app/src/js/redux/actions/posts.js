export const refreshPosts = () =>
({
  type: 'REFRESH_POSTS'
})

export const saveFreePost = post =>
({
  type: 'SAVE_FREE_POST',
  payload: {
    post
  }
})

export const sharePost = ({name, email, message, postId}, user, url) =>
({
  type: 'SHARE_POST',
  payload: {
    name,
    email,
    message,
    postId,
    token: user.token,
    url
  }
})

export const onSharePostSuccess = res =>
({
  type: 'SHARE_POST_SUCCESS',
  payload: {
    post: res.body.post
  }
})

export const deletePost = (id, user) =>
({
  type: 'DELETE_POST',
  payload: {
    id,
    token: user.token
  }
})

export const onDeletePostSuccess = res =>
({
  type: 'DELETE_POST_SUCCESS',
  payload: {
    post: res.body.post
  }
})

export const setCurrentPost = post =>
({
  type: 'SET_CURRENT_POST',
  payload: {
    post
  }
})

export const fetchPosts = user =>
({
  type: 'FETCH_POSTS',
  payload: {
    token: user.token
  }
})

export const onFetchPostsSuccess = res =>
({
  type: 'FETCH_POSTS_SUCCESS',
  payload: {
    posts: res.body.posts
  }
})


export const fetchSinglePost = (id, user) =>
({
  type: 'FETCH_SINGLE_POST',
  payload: {
    postId: id,
    token: user.token
  }
})

export const onFetchSinglePostSuccess = res =>
({
  type: 'FETCH_SINGLE_POST_SUCCESS',
  payload: {
    post: res.body.post
  }
})

export const createPost = (post, {token}) =>
({
  type: 'CREATE_POST',
  payload: {
    post,
    token
  }
})

export const onCreatePostSuccess = res =>
({
  type: 'CREATE_POST_SUCCESS',
  payload: {
    post: res.body.post
  }
})

export const uploadPostImage = (image, {token}) =>
({
  type: 'UPLOAD_POST_IMAGE',
  payload: {
    image,
    token
  }
})

export const onUploadPostImageSuccess = res =>
({
  type: 'UPLOAD_POST_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const uploadFreePostImage = image =>
({
  type: 'UPLOAD_FREE_POST_IMAGE',
  payload: {
    image
  }
})

export const onUploadFreePostImageSuccess = res =>
({
  type: 'UPLOAD_FREE_POST_IMAGE_SUCCESS',
  payload: {
    image: res.body.image
  }
})

export const editPost = ({id, name, description, image, amount, post_type, is_public}, {token}) =>
({
  type: 'EDIT_POST',
  payload: {
    id,
    name,
    description,
    image,
    amount,
    post_type,
    is_public,
    token,
  }
})

export const onEditPostSuccess = res =>
({
  type: 'EDIT_POST_SUCCESS',
  payload: {
    post: res.body.post
  }
})
