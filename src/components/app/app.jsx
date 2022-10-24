import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import PostsPage from '../posts-page/posts-page'
import Header from '../header/header'
import FullPostPage from '../full-post-page/full-post-page'
import SignUpForm from '../sign-up-form/sign-up-form'
import SignInForm from '../sign-in-form/sign-in-form'
import ProfileEditForm from '../profile-edit-form/profile-edit-form'
import CreatePostForm from '../create-post-form/create-post-form'
import EditPostForm from '../edit-post-form/edit-post-form'

import './app.scss'

function App() {
  const dispatch = useDispatch()
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/sign-up" component={SignUpForm} />
          <Route path="/sign-in" component={SignInForm} />
          <Route path="/new-article" component={CreatePostForm} />
          <Route path="/profile" component={ProfileEditForm} />
          <Route
            path="/:page"
            render={({ match }) => {
              const { page } = match.params
              dispatch({ type: 'PAGE_NUMBER_UPDATE', page })
              return <PostsPage page={Number(page)} />
            }}
            exact
          />
          <Route
            path="/articles/:slug/edit"
            render={({ match }) => {
              const { slug } = match.params
              return <EditPostForm slug={slug} />
            }}
          />
          <Route
            path="/articles/:slug"
            render={({ match }) => {
              const { slug } = match.params
              return <FullPostPage slug={slug} />
            }}
          />
          <Redirect to="/1" />
        </Switch>
      </Router>
    </div>
  )
}

export default App
