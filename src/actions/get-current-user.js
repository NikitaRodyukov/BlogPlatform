const getCurrentUser = (token) => (dispatch) => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
  }

  dispatch({
    type: 'SHOW_LOADER',
  })

  dispatch({
    type: 'GET_CURRENT_USER',
  })

  fetch('https://blog.kata.academy/api/user', requestOptions).then(
    async (response) => {
      const answer = await response.json()

      if (!response.ok) {
        dispatch({
          type: 'UPDATE_ERROR',
          data: answer,
        })
      } else {
        dispatch({
          type: 'UPDATE_OK',
          data: answer,
        })

        dispatch({
          type: 'HIDE_LOADER',
        })
      }
      return answer
    }
  )
}

export default getCurrentUser
