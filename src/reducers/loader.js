const loaderStatusReducer = (state = true, action) => {
  switch (action.type) {
    case 'SHOW_LOADER':
      return true

    case 'HIDE_LOADER':
      return false

    default:
      return state
  }
}
export default loaderStatusReducer
