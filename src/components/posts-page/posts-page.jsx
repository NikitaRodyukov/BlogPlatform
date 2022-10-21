import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Pagination, Spin } from 'antd'

import getPosts from '../../actions/get-posts'
import updateCurrentPage from '../../actions/update-current-page'
import ShortPost from '../short-post/short-post'

import classes from './posts-page.module.scss'

export default function PostsPage() {
  const dispatch = useDispatch()
  const {
    currentPage,
    showLoader,
    getPostsReducer: { articles, articlesCount },
  } = useSelector((state) => state)

  let postKey = -1

  useEffect(() => {
    dispatch(getPosts(currentPage - 1))
  }, [])

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
      }) => {
        postKey += 1
        return (
          <ShortPost
            key={postKey}
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
      }
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
