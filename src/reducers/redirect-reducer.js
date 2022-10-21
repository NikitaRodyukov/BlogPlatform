const redirectStatusReducer = (state = false, action) => {
  switch (action.type) {
    case 'REDIRECT_TRUE':
      return true

    case 'REDIRECT_FALSE':
      return false

    default:
      return state
  }
}
export default redirectStatusReducer
