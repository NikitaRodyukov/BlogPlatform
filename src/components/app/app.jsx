import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import PostsPage from '../posts-page/posts-page'
import Header from '../header/header'
import FullPostPage from '../full-post-page/full-post-page'
import SignUpForm from '../sign-up-form/sign-up-form'
import SignInForm from '../sign-in-form/sign-in-form'
import ProfileEditForm from '../profile-edit-form/profile-edit-form'
import PostForm from '../post-form/post-form'

import './app.scss'

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route path="/" component={PostsPage} exact />
          <Route path="/articles/" component={PostsPage} exact />
          <Route path="/new-article" component={PostForm} exact />
          <Route path="/sign-up" component={SignUpForm} exact />
          <Route path="/sign-in" component={SignInForm} exact />
          <Route path="/profile" component={ProfileEditForm} exact />
          <Route
            path="/:slug"
            render={({ match }) => {
              const { slug } = match.params
              return <FullPostPage slug={slug} />
            }}
          />
        </Switch>
      </Router>
    </div>
  )
}

export default App
