import { Link } from 'react-router-dom'
import { HeartFilled, HeartOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { format, parseISO } from 'date-fns'

import getFullPost from '../../actions/get-full-post'

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
  return (
    <div className={classes['short-post']}>
      <div className={classes['left-part']}>
        <div className={classes['top-part']}>
          <Link
            to={slug}
            className={classes.title}
            onClick={() => {
              dispatch(getFullPost(slug))
            }}
          >
            {title}
          </Link>
          <div className={classes.favorited}>
            {favorited ? (
              <HeartFilled style={{ fontSize: '1.6rem', color: '#FF0707' }} />
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
        {/* <div className="following">{following}</div> */}
      </div>
    </div>
  )
}
