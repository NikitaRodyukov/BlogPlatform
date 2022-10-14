const updateCurrentPageReducer = (state = 1, action) => {
  const { type, page } = action

  switch (type) {
    case 'PAGE_NUMBER_UPDATE':
      return page

    default:
      return state
  }
}

export default updateCurrentPageReducer
