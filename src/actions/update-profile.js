const updateProfile = (data) => (dispatch) => {
  const token = localStorage.getItem('token')

  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify({ user: data }),
  }
  dispatch({
    type: 'UPDATE_PROFILE',
  })

  fetch('https://blog.kata.academy/api/user', requestOptions).then(
    async (response) => {
      const answer = await response.json()

      if (!response.ok) {
        dispatch({
          type: 'REGESTRATION_ERROR',
          data: answer,
        })
      } else {
        dispatch({
          type: 'RECEIVED_PROFILE',
          data: answer,
        })
      }
      return answer
    }
  )
}

export default updateProfile
