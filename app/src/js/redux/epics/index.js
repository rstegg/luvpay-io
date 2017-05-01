import { combineEpics } from 'redux-observable'
import loginSubmit from './login'
import signupSubmit from './signup'
import { fetchPosts, fetchSinglePost, createPost, uploadPostImage, uploadFreePostImage, editPost, deletePost, sharePost } from './posts'
import { fetchPages, fetchSinglePage, createPage } from './pages'
import { fetchArticles, fetchSingleArticle, createArticle } from './articles'
import { uploadAvatar, editProfile, fetchProfile } from './profile'
import { fetchFeed, fetchPublicFeed } from './feed'
import { createStripeCard, createStripeBank } from './stripe'

export default combineEpics(
  createStripeBank,
  createStripeCard,
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
  loginSubmit,
  signupSubmit,
  uploadAvatar,
  uploadPostImage,
  uploadFreePostImage,
  editProfile,
  fetchProfile,
)
