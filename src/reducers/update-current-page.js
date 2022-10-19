const updateCurrentPageReducer = (state = 1, action) => {
  const { type, page } = action

  switch (type) {
    case 'PAGE_NUMBER_UPDATE':
      return page

    case 'RETURN_TO_PAGE_1':
      return 1

    default:
      return state
  }
}

export default updateCurrentPageReducer
