import { BrowserRouter as Router, Route } from 'react-router-dom'

import PostsPage from '../posts-page/posts-page'
import Header from '../header/header'
import FullPostPage from '../full-post-page/full-post-page'

import './app.scss'

function App() {
  return (
    <div className="app">
      <Router>
        <Header />
        <Route path="/" component={PostsPage} exact />
        <Route
          path="/:slug"
          render={({ match }) => {
            const { slug } = match.params
            return <FullPostPage slug={slug} />
          }}
        />
      </Router>
    </div>
  )
}

export default App
