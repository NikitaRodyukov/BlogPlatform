const getPostsReducer = (state = [], action) => {
  const { type, articles, articlesCount } = action

  switch (type) {
    case 'DATA_LOAD_FINISHED':
      return { articles, articlesCount }

    default:
      return state
  }
}
export default getPostsReducer
