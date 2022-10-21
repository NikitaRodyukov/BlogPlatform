const deleteArticle = (token, slug) => (dispatch) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }

  dispatch({
    type: 'SHOW_LOADER',
  })

  fetch(`https://blog.kata.academy/api/articles/${slug}`, requestOptions).then(
    async (response) => {
      dispatch({
        type: 'REDIRECT_TRUE',
      })

      if (!response.ok) {
        const answer = await response.json()
        dispatch({
          type: 'POST_ARTICLE_ERROR',
          data: answer,
        })
      } else {
        dispatch({
          type: 'POST_ARTICLE_OK',
        })

        dispatch({
          type: 'HIDE_LOADER',
        })
      }
    }
  )
}

export default deleteArticle
