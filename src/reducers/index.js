import { combineReducers } from 'redux'

import getPostsReducer from './get-posts'
import updateCurrentPageReducer from './update-current-page'
import loaderStatusReducer from './loader'
import fullPostReducer from './get-full-post'
import signUpReducer from './sign-up'
import signInReducer from './sign-in'
import currentUserReducer from './current-user'
import redirectStatusReducer from './redirect-reducer'

const allReducers = combineReducers({
  getPostsReducer,
  currentPage: updateCurrentPageReducer,
  showLoader: loaderStatusReducer,
  fullPost: fullPostReducer,
  signUpStatus: signUpReducer,
  signInStatus: signInReducer,
  currentUser: currentUserReducer,
  redirectStatus: redirectStatusReducer,
})

export default allReducers
