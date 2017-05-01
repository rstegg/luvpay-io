const initialState = {
  list: [],
  public: [],
  current: {}
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'FETCH_FEED_SUCCESS':
      return Object.assign({}, state, {
        list: action.payload.feed
      })
    case 'FETCH_PUBLIC_FEED_SUCCESS':
      return Object.assign({}, state, {
        public: action.payload.feed
      })
    case 'FETCH_PUBLIC_FEED_POST_SUCCESS':
      return Object.assign({}, state, {
        current: action.payload.feed
      })
    case 'FETCH_PUBLIC_FEED_FAILURE':
    case 'FETCH_PUBLIC_FEED_POST_FAILURE':
    default:
      return state
  }
}
