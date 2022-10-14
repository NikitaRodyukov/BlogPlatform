// Реализовать компонент поста с полным описанием и отрендерить используя Markdown
import { format, parseISO } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import getFullPost from '../../actions/get-full-post'

import classes from './full-post-page.module.scss'

export default function FullPostPage({ slug }) {
  const dispatch = useDispatch()
  useEffect(() => {
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
    author,
  } = useSelector((state) => state.fullPost)

  const { username, image } = !!author && author

  let keyTag = 0
  const tags =
    tagList &&
    tagList.map((tag) => {
      keyTag += 1
      return (
        <div key={keyTag} className={classes.tag}>
          {tag}
        </div>
      )
    })

  return (
    tagList && (
      <div className={classes['full-post']}>
        <div className={classes.header}>
          <div className={classes['left-part']}>
            <div className={classes['top-part']}>
              <div className={classes.title}>{title}</div>
              <div className={classes.favorited}>
                {favorited ? (
                  <HeartFilled
                    style={{ fontSize: '1.6rem', color: '#FF0707' }}
                  />
                ) : (
                  <HeartOutlined
                    style={{
                      fontSize: '1.6rem',
                    }}
                  />
                )}
              </div>
              <div className={classes['favorites-count']}>{favoritesCount}</div>
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
        <ReactMarkdown className={classes.body}>{body}</ReactMarkdown>
      </div>
    )
  )
}
