const initialState = {
  userId: null,
  isLoading: false,
  isEdited: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'VIEW_PROFILE':
      return Object.assign({}, state, {
        userId: action.payload.userId
      })
    case 'EDIT_PROFILE':
      return Object.assign({}, state, {
        isLoading: true,
        isEdited: false
      })
    case 'FETCH_PROFILE':
      return Object.assign({}, state, {
        isLoading: true
      })
    case 'FETCH_PROFILE_SUCCESS':
      return Object.assign({}, state, {
        ...action.payload.profile,
        userId: action.payload.profile.id,
        isLoading: false,
        isEdited: false
      })
    case 'EDIT_PROFILE_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        isEdited: true
      })
    case 'RESET_PROFILE_EDITING':
      return Object.assign({}, state, {
        isLoading: false,
        isEdited: false
      })
    default:
      return state
  }
}
