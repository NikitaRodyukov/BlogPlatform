import { Link } from 'react-router-dom'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { format, parseISO } from 'date-fns'
import { useState } from 'react'

import getFullPost from '../../actions/get-full-post'
import disLikePost from '../../actions/dislike-post'
import likePost from '../../actions/like-post'
import getPosts from '../../actions/get-posts'

import classes from './short-post.module.scss'

export default function ShortPost({
  title,
  description,
  tagList,
  favorited,
  favoritesCount,
  author: { username, image },
  slug,
  updatedAt,
}) {
  const dispatch = useDispatch()
  let keyTag = 0
  const tags = tagList.map((tag) => {
    keyTag += 1
    if (tag === '') return null
    return (
      <div key={keyTag} className={classes.tag}>
        {tag}
      </div>
    )
  })

  const [logInErrror, setLogInError] = useState(false)
  const { user } = useSelector((state) => state.currentUser)
  const token = localStorage.getItem('token')
  const currentPage = useSelector((state) => state.currentPage)

  return (
    <div className={classes['short-post']}>
      <div className={classes['left-part']}>
        <div className={classes['top-part']}>
          <Link
            to={`/articles/${slug}`}
            className={classes.title}
            onClick={() => {
              dispatch(getFullPost(slug))
            }}
          >
            {title}
          </Link>
          <div className={classes.favorited}>
            {favorited ? (
              <HeartFilled
                style={{ fontSize: '1.6rem', color: '#FF0707' }}
                onClick={() => {
                  dispatch(disLikePost(token, slug))
                  dispatch(getPosts(currentPage - 1))
                }}
              />
            ) : (
              <HeartOutlined
                style={{
                  fontSize: '1.6rem',
                }}
                onClick={() => {
                  if (!user) {
                    setLogInError(true)
                    return
                  }
                  dispatch(likePost(token, slug))
                  dispatch(getPosts(currentPage - 1))
                }}
              />
            )}
            <div className={classes['favorites-count']}>{favoritesCount}</div>
            {logInErrror && (
              <div className="error-message">Login to like this post</div>
            )}
          </div>
        </div>
        <div className={classes.tags}>{tags}</div>
        <div className={classes.description}>{description}</div>
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
  )
}
