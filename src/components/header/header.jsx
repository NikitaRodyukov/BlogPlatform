import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Image from '../../images/default_image.png'
import getCurrentUser from '../../actions/get-current-user'
import updateCurrentPage from '../../actions/update-current-page'
import getPosts from '../../actions/get-posts'
import logOut from '../../actions/log-out'

import classes from './header.module.scss'

export default function Header() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  const { user } = useSelector((state) => state.currentUser)
  const signInStatus = useSelector((state) => state.signInStatus)

  useEffect(() => {
    if (token !== null) {
      dispatch(getCurrentUser(token))
    }
  }, [signInStatus])

  const userBlock = user && (
    <div className={classes['user-block']}>
      <Link to="/new-article">Create article</Link>
      <Link to="/profile">
        <div>{user.username}</div>
      </Link>
      <Link to="/profile">
        <img
          className={classes['user-image']}
          src={user.image || Image}
          alt={user.username}
        />
      </Link>
      <button
        className={classes['log-out']}
        type="button"
        onClick={() => dispatch(logOut())}
      >
        Log Out
      </button>
    </div>
  )

  return (
    <div className={classes.header}>
      <Link
        className={classes['logo-name']}
        to="/"
        onClick={() => {
          dispatch(updateCurrentPage())
          dispatch(getPosts())
        }}
      >
        Realworld Blog
      </Link>
      {token ? (
        userBlock
      ) : (
        <div className={classes['btns-block']}>
          <Link to="/sign-in" className={classes['btn__sign-in']}>
            Sign In
          </Link>
          <Link to="/sign-up" className={classes['btn__sign-up']}>
            Sign Up
          </Link>
        </div>
      )}
    </div>
  )
}
