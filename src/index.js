/* eslint-disable no-underscore-dangle */
import { createRoot } from 'react-dom/client'
import {
  legacy_createStore as createStore,
  compose,
  applyMiddleware,
} from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import allReducers from './reducers'
import App from './components/app/app'

const store = createStore(allReducers, compose(applyMiddleware(thunk)))
/* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
