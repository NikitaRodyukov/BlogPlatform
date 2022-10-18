import { combineReducers } from 'redux'

import getPostsReducer from './get-posts'
import updateCurrentPageReducer from './update-current-page'
import loaderStatusReducer from './loader'
import fullPostReducer from './get-full-post'
import signUpReducer from './sign-up'

const allReducers = combineReducers({
  getPostsReducer,
  currentPage: updateCurrentPageReducer,
  showLoader: loaderStatusReducer,
  fullPost: fullPostReducer,
  signUpStatus: signUpReducer,
})

export default allReducers
