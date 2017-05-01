const initialState = {
  current: {},
  new: {},
  list: []
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_ARTICLES_SUCCESS':
      return Object.assign({}, state, {
        list: action.payload.articles
      })
    case 'CREATE_ARTICLE_SUCCESS':
      return Object.assign({}, state, {
        list: [...state.list, action.payload.article],
        new: {
          ...state.new,
          isCreated: true
        }
      })
    case 'FETCH_SINGLE_ARTICLE_SUCCESS':
      return Object.assign({}, state, {
        current: action.payload.article
      })
    case 'SET_CURRENT_ARTICLE':
      return Object.assign({}, state, {
        current: action.payload.article
      })
    case 'REFRESH_ARTICLES':
      return Object.assign({}, state, {
        current: initialState.current,
        new: initialState.new
      })
    case 'FETCH_ARTICLES_FAILURE':
    case 'CREATE_STRIPE_CARD_FAILURE':
    case 'CREATE_ARTICLE_FAILURE':
    default:
      return state
  }
}
