const initialState = {
  current: {},
  new: {},
  list: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_PAGES_SUCCESS':
      return Object.assign({}, state, {
        list: action.payload.pages
      })
    case 'CREATE_PAGE_SUCCESS':
      return Object.assign({}, state, {
        list: [...state.list, action.payload.page],
        new: {
          ...state.new,
          isCreated: true
        }
      })
    case 'EDIT_PAGE_FIELD':
      return Object.assign({}, state, {
        current: {
          ...state.current,
          focused: action.payload.field
        }
      })
    case 'EDIT_PAGE':
      return Object.assign({}, state, {
        current: {
          ...action.payload.page,
          focused: null
        }
      })
    case 'EDIT_PAGE_SUCCESS':
      return state //FIXME: PLACEHOLDER
    case 'DELETE_PAGE_SUCCESS':
      return Object.assign({}, state, {
        current: null
      })
    case 'UPLOAD_PAGE_IMAGE_SUCCESS':
    case 'UPLOAD_EDIT_PAGE_IMAGE_SUCCESS':
      return Object.assign({}, state, {
        image: action.payload.image,
      })
    case 'FETCH_SINGLE_PAGE_SUCCESS':
      return Object.assign({}, state, {
        current: action.payload.page
      })
    case 'SET_CURRENT_PAGE':
      return Object.assign({}, state, {
        current: action.payload.page
      })
    case 'REFRESH_PAGES':
      return Object.assign({}, state, {
        current: initialState.current,
        new: initialState.new
      })
    case 'FETCH_PAGES_FAILURE':
    case 'CREATE_STRIPE_CARD_FAILURE':
    case 'CREATE_PAGE_FAILURE':
    default:
      return state
  }
}
