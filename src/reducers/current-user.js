const defState = { user: { username: '', image: '', token: '', email: '' } }

const currentUserReducer = (state = defState, action) => {
  const { type, data } = action
  switch (type) {
    case 'UPDATE_OK':
      localStorage.setItem('token', data.user.token)
      return data

    case 'UPDATE_ERROR':
      return data

    case 'LOG_OUT':
      localStorage.removeItem('token')
      return defState

    default:
      return state
  }
}

export default currentUserReducer
