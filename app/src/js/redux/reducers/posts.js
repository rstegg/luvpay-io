import { REHYDRATE } from 'redux-persist/constants'

const initialState = {
  current: {},
  new: {},
  list: [],
  free: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'SAVE_FREE_POST':
      return Object.assign({}, state, {
        free: {
          ...action.payload.post,
          isSaved: true
        }
      })
    case 'FETCH_POSTS_SUCCESS':
      return Object.assign({}, state, {
        list: action.payload.posts
      })
    case 'CREATE_POST_SUCCESS':
      return Object.assign({}, state, {
        list: [...state.list, action.payload.post],
        new: {
          ...state.new,
          isCreated: true
        },
        free: initialState.free
      })
    case 'EDIT_POST_SUCCESS':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          isEdited: true
        }
      })
    case 'DELETE_POST_SUCCESS':
      return Object.assign({}, state, {
        current: null
      })
    case 'UPLOAD_POST_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        image: action.payload.image,
      })
    case 'UPLOAD_FREE_POST_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        free: {
          ...state.free,
          image: action.payload.image
        }
      })
    case 'FETCH_SINGLE_POST_SUCCESS':
      return Object.assign({}, state, {
        current: action.payload.post
      })
    case 'SET_CURRENT_POST':
      return Object.assign({}, state, {
        current: action.payload.post
      })
    case 'REFRESH_POSTS':
      return Object.assign({}, state, {
        current: initialState.current,
        new: initialState.new,
        free: initialState.free,
      })
    case REHYDRATE:
      const incoming = action.payload.posts
      if(incoming) {
        return Object.assign({}, state, {
          free: action.payload.posts.free
        })
      }
      return state
    case 'FETCH_POSTS_FAILURE':
    case 'FETCH_SINGLE_POST_FAILURE':
    case 'CREATE_POST_FAILURE':
    case 'EDIT_POST_FAILURE':
    case 'UPLOAD_POST_IMAGE_FAILURE':
    default:
      return state
  }
}
