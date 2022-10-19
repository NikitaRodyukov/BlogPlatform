const getPosts = (currentPostsAdded) => (dispatch) => {
  const postPerPage = 6
  dispatch({
    type: 'DATA_LOAD_TRUE',
  })
  fetch(
    `https://blog.kata.academy/api/articles?limit=${postPerPage}&offset=${
      currentPostsAdded * 6
    }`
  )
    .then((response) => response.json())
    .then(({ articles, articlesCount }) =>
      dispatch({
        type: 'DATA_LOAD_FINISHED',
        articles,
        articlesCount,
      })
    )
    .catch((e) => new Error(e.message))
}

export default getPosts
