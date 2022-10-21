const signInReducer = (
  state = { status: false, errors: { username: '', email: '' } },
  action
) => {
  const { type, data } = action

  switch (type) {
    case 'SIGN_IN_OK':
      localStorage.setItem('token', data)
      return { status: true }

    case 'UPDATE_OK':
      localStorage.setItem('token', data)
      return { status: true }

    case 'SIGN_IN_ERROR':
      return data

    case 'LOG_OUT':
      localStorage.removeItem('token')
      return { status: false }

    default:
      return state
  }
}

export default signInReducer
