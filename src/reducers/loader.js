const loaderStatusReducer = (state = true, action) => {
  switch (action.type) {
    case 'DATA_LOAD_TRUE':
      return true

    case 'DATA_LOAD_FINISHED':
      return false

    case 'POST_LOAD_TRUE':
      return true

    case 'POST_LOADED':
      return false

    default:
      return state
  }
}
export default loaderStatusReducer
