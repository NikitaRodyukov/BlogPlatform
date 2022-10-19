const updateProfileReducer = (state = {}, action) => {
  const { type, data } = action

  switch (type) {
    case 'RECEIVED_PROFILE':
      return data

    case 'UPDATE_ERROR':
      return data

    default:
      return state
  }
}

export default updateProfileReducer
