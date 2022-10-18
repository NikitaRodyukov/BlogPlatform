export const signIn = (signInData) => (dispatch) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user: signInData }),
  }

  dispatch({
    type: 'SIGN_IN',
  })

  fetch('https://blog.kata.academy/api/users/login', requestOptions).then(
    async (response) => {
      const answer = await response.json()

      if (!response.ok) {
        dispatch({
          type: 'SIGN_IN_ERROR',
          data: answer,
        })
      } else {
        dispatch({
          type: 'SIGN_IN_OK',
          data: answer.user.token,
        })

        dispatch({
          type: 'UPDATE_OK',
          data: answer,
        })
      }
      return answer
    }
  )
}

export default signIn
