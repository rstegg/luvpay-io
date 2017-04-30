import { combineEpics } from 'redux-observable'
import loginSubmit from './login'
import signupSubmit from './signup'
import { fetchPosts, fetchSinglePost, createPost, uploadPostImage, uploadFreePostImage, editPost, deletePost, sharePost } from './posts'
import { fetchPayments, createPayment } from './payments'
import { uploadAvatar, editProfile, fetchProfile } from './profile'
import { fetchFeed } from './feed'
import { createStripeCard, createStripeBank } from './stripe'

export default combineEpics(
  createStripeBank,
  createStripeCard,
  fetchFeed,
  fetchPosts,
  fetchSinglePost,
  createPost,
  editPost,
  deletePost,
  sharePost,
  fetchPayments,
  createPayment,
  loginSubmit,
  signupSubmit,
  uploadAvatar,
  uploadPostImage,
  uploadFreePostImage,
  editProfile,
  fetchProfile,
)
