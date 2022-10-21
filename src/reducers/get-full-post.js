const fullPostReducer = (
  state = {
    slug: '',
    title: '',
    description: '',
    body: '',
    tagList: [],
    updatedAt: '2020-05-12T23:50:21.817Z',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      image: '',
    },
  },
  action
) => {
  const { type, article } = action

  switch (type) {
    case 'POST_LOADED':
      return article

    default:
      return state
  }
}
export default fullPostReducer
