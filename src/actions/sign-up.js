const signUp = (signUpData) => (dispatch) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: signUpData }),
  }
  dispatch({
    type: 'SIGN_UP',
  })

  fetch('https://blog.kata.academy/api/users', requestOptions).then(
    async (response) => {
      const answer = await response.json()

      if (!response.ok) {
        dispatch({
          type: 'REGESTRATION_ERROR',
          data: answer,
        })
      } else {
        dispatch({
          type: 'RECEIVED_USER',
          data: answer,
        })
      }
      return answer
    }
  )
}

export default signUp
