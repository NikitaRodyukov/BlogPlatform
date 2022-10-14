import { combineReducers } from 'redux'

import getPostsReducer from './get-posts'
import updateCurrentPageReducer from './update-current-page'
import loaderStatusReducer from './loader'
import fullPostReducer from './get-full-post'

const allReducers = combineReducers({
  getPostsReducer,
  currentPage: updateCurrentPageReducer,
  showLoader: loaderStatusReducer,
  fullPost: fullPostReducer,
})

export default allReducers
