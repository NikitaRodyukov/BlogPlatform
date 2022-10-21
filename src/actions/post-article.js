const postArticle = (data, token) => (dispatch) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ article: data }),
  }

  dispatch({
    type: 'POST_ARTICLE',
  })

  dispatch({
    type: 'SHOW_LOADER',
  })

  fetch('https://blog.kata.academy/api/articles', requestOptions).then(
    async (response) => {
      const answer = await response.json()
      dispatch({
        type: 'REDIRECT_TRUE',
      })

      dispatch({
        type: 'HIDE_LOADER',
      })

      if (!response.ok) {
        dispatch({
          type: 'POST_ARTICLE_ERROR',
          data: answer,
        })
      } else {
        dispatch({
          type: 'POST_ARTICLE_OK',
        })
      }
      return answer
    }
  )
}

export default postArticle
