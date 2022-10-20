const likePost = (token, slug) => (dispatch) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }

  dispatch({
    type: 'POST_ARTICLE',
  })

  fetch(
    `https://blog.kata.academy/api/articles/${slug}/favorite`,
    requestOptions
  ).then(async (response) => {
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
    }
  })
}

export default likePost
