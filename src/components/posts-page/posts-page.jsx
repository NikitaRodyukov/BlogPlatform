import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Pagination, Spin } from 'antd'
import { withRouter } from 'react-router-dom'

import getPosts from '../../actions/get-posts'
import updateCurrentPage from '../../actions/update-current-page'
import ShortPost from '../short-post/short-post'

import classes from './posts-page.module.scss'

function PostsPage({ history, page: currentPage }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(updateCurrentPage(currentPage))
    dispatch(getPosts(currentPage - 1))
  }, [])

  const {
    showLoader,
    getPostsReducer: { articles, articlesCount },
  } = useSelector((state) => state)

  const postsToRender =
    articles &&
    articles.map(
      ({
        title,
        description,
        tagList,
        favorited,
        favoritesCount,
        author,
        slug,
        updatedAt,
      }) => (
        <ShortPost
          key={slug}
          title={title}
          description={description}
          tagList={tagList}
          favorited={favorited}
          favoritesCount={favoritesCount}
          author={author}
          slug={slug}
          updatedAt={updatedAt}
        />
      )
    )

  return (
    <div className={classes['posts-wrapper']}>
      {showLoader ? (
        <Spin size="large" />
      ) : (
        <>
          {postsToRender}
          <Pagination
            onChange={(page) => {
              dispatch(updateCurrentPage(page))
              dispatch(getPosts(page - 1))
              history.push(`/${page}`)
            }}
            current={currentPage}
            size="small"
            total={articlesCount}
            defaultPageSize={6}
            showSizeChanger={false}
            hideOnSinglePage
            responsive
          />
        </>
      )}
    </div>
  )
}

export default withRouter(PostsPage)
