const fullPostReducer = (state = {}, action) => {
  const { type, article } = action

  switch (type) {
    case 'POST_LOADED':
      return article

    default:
      return state
  }
}
export default fullPostReducer
