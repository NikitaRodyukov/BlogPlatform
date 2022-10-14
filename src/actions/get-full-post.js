const getFullPost = (slug) => (dispatch) => {
  dispatch({
    type: 'POST_LOAD_TRUE',
  })

  fetch(`https://blog.kata.academy/api/articles/${slug}`)
    .then((response) => response.json())
    .then(({ article }) =>
      dispatch({
        type: 'POST_LOADED',
        article,
      })
    )
    .catch((e) => new Error(e.message))
}

export default getFullPost
