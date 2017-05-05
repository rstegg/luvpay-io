import { combineEpics } from 'redux-observable'
import loginSubmit from './login'
import signupSubmit from './signup'
import { fetchPosts, fetchSinglePost, createPost, uploadPostImage, uploadFreePostImage, editPost, deletePost, sharePost } from './posts'
import { fetchPages, fetchSinglePage, createPage, uploadPageImage, uploadEditPageImage, editPage, deletePage } from './pages'
import { fetchArticles, fetchSingleArticle, createArticle } from './articles'
import { uploadAvatar, editProfile, fetchProfile } from './profile'
import { fetchFeed, fetchPublicFeed } from './feed'

export default combineEpics(
  fetchFeed,
  fetchPublicFeed,
  fetchPosts,
  fetchSinglePost,
  createPost,
  editPost,
  deletePost,
  sharePost,
  fetchArticles,
  createArticle,
  fetchSinglePage,
  fetchSingleArticle,
  fetchPages,
  createPage,
  editPage,
  deletePage,
  loginSubmit,
  signupSubmit,
  uploadAvatar,
  uploadPostImage,
  uploadFreePostImage,
  uploadPageImage,
  uploadEditPageImage,
  editProfile,
  fetchProfile,
)
