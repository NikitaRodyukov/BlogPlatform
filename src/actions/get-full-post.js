const getFullPost = (slug) => (dispatch) => {
  dispatch({
    type: 'POST_LOAD_TRUE',
  })

  dispatch({
    type: 'SHOW_LOADER',
  })

  fetch(`https://blog.kata.academy/api/articles/${slug}`)
    .then((response) => response.json())
    .then(({ article }) => {
      dispatch({
        type: 'POST_LOADED',
        article,
      })

      dispatch({
        type: 'HIDE_LOADER',
      })
    })
    .catch(() => {
      dispatch({
        type: 'HIDE_LOADER',
      })
      dispatch({
        type: 'REDIRECT_TRUE',
      })
    })
}

export default getFullPost
