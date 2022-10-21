import { format, parseISO } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Popconfirm, Spin } from 'antd'

import getFullPost from '../../actions/get-full-post'
import deleteArticle from '../../actions/delete-article'
import disLikePost from '../../actions/dislike-post'
import likePost from '../../actions/like-post'

import classes from './full-post-page.module.scss'

export default function FullPostPage({ slug }) {
  const [logInErrror, setLogInError] = useState(false)
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const {
    currentUser: { user },
    showLoader,
    redirectStatus,
  } = useSelector((state) => state)

  let currentUserisAuthor = false
  let keyTag = 0

  useEffect(() => {
    dispatch({ type: 'REDIRECT_FALSE' })
    dispatch(getFullPost(slug))
  }, [])

  const {
    title,
    description,
    body,
    tagList,
    updatedAt,
    favorited,
    favoritesCount,
    author: { username, image },
  } = useSelector((state) => state.fullPost)

  if (username === user.username) {
    currentUserisAuthor = true
  }

  const tags =
    tagList &&
    tagList.map((tag) => {
      if (tag === '') return null
      keyTag += 1
      return (
        <div key={keyTag} className={classes.tag}>
          {tag}
        </div>
      )
    })
  if (redirectStatus) {
    return <Redirect to="/" />
  }
  return (
    tagList && (
      <div className={classes['full-post']}>
        {showLoader ? (
          <Spin size="large" />
        ) : (
          <>
            <div className={classes.header}>
              <div className={classes['top-part']}>
                <div className={classes['left-part']}>
                  <div className={classes.title}>{title}</div>
                  <div className={classes.favorited}>
                    {favorited ? (
                      <HeartFilled
                        style={{ fontSize: '1.6rem', color: '#FF0707' }}
                        onClick={() => {
                          dispatch(disLikePost(token, slug))
                          dispatch(getFullPost(slug))
                        }}
                      />
                    ) : (
                      <HeartOutlined
                        style={{
                          fontSize: '1.6rem',
                        }}
                        onClick={() => {
                          if (!token) {
                            setLogInError(true)
                            return
                          }
                          dispatch(likePost(token, slug))
                          dispatch(getFullPost(slug))
                        }}
                      />
                    )}
                    <div className={classes['favorites-count']}>
                      {favoritesCount}
                    </div>
                    {logInErrror && (
                      <div className="error-message">
                        Login to like this post
                      </div>
                    )}
                  </div>
                  <div className={classes.tags}>{tags}</div>
                </div>
                <div className={classes.author}>
                  <div className={classes['left-side']}>
                    <div className={classes.name}>{username}</div>
                    <div className={classes['post-date']}>
                      {format(parseISO(updatedAt), 'MMMM d, yyyy')}
                    </div>
                  </div>
                  <img className={classes.image} src={image} alt="username" />
                </div>
              </div>
              <div className={classes['bottom-part']}>
                <div className={classes.description}>{description}</div>
                {currentUserisAuthor && (
                  <div className={classes.btns}>
                    <Popconfirm
                      placement="rightTop"
                      title="Are you sure to delete this article?"
                      onConfirm={() => {
                        dispatch(deleteArticle(token, slug))
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button type="button" className={classes.delete}>
                        Delete
                      </button>
                    </Popconfirm>

                    <Link
                      to={`/articles/${slug}/edit`}
                      className={classes.edit}
                    >
                      Edit
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <ReactMarkdown className={classes.body}>{body}</ReactMarkdown>
          </>
        )}
      </div>
    )
  )
}
