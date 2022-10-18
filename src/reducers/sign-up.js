const signUpReducer = (state = {}, action) => {
  const { type, data } = action

  switch (type) {
    case 'RECEIVED_USER':
      return data

    case 'REGESTRATION_ERROR':
      return data

    case 'CLEAR_ERROR':
      return {}

    default:
      return state
  }
}

export default signUpReducer
