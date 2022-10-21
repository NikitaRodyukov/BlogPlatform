const getPosts = (currentPostsAdded) => (dispatch) => {
  const postPerPage = 6

  dispatch({
    type: 'DATA_LOAD_TRUE',
  })

  dispatch({
    type: 'SHOW_LOADER',
  })

  dispatch({
    type: 'REDIRECT_FALSE',
  })

  fetch(
    `https://blog.kata.academy/api/articles?limit=${postPerPage}&offset=${
      currentPostsAdded * 6
    }`
  )
    .then((response) => response.json())
    .then(({ articles, articlesCount }) => {
      dispatch({
        type: 'DATA_LOAD_FINISHED',
        articles,
        articlesCount,
      })

      dispatch({
        type: 'HIDE_LOADER',
      })
    })
    .catch((e) => new Error(e.message))
}

export default getPosts
