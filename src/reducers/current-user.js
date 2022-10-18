const currentUserReducer = (state = {}, action) => {
  const { type, data } = action
  switch (type) {
    case 'UPDATE_OK':
      localStorage.setItem('token', data.user.token)
      return data

    case 'UPDATE_ERROR':
      return data

    case 'LOG_OUT':
      localStorage.removeItem('token')
      return {}

    default:
      return state
  }
}

export default currentUserReducer
