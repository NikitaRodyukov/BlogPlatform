const signInReducer = (state = {}, action) => {
  const { type, data } = action

  switch (type) {
    case 'SIGN_IN_OK':
      localStorage.setItem('token', data)
      return { status: true }

    case 'SIGN_IN_ERROR':
      return data

    case 'CLEAR_ERROR':
      return {}

    default:
      return state
  }
}

export default signInReducer
