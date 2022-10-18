import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Image from '../../images/default_image.png'
import { getCurrentUser } from '../../actions/get-current-user'
import logOut from '../../actions/log-out'

import classes from './header.module.scss'

export default function Header() {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const { user } = useSelector((state) => state.currentUser)

  useEffect(() => {
    if (token) {
      dispatch(getCurrentUser(token))
    }
  }, [token])

  const userBlock = user && (
    <div className={classes['user-block']}>
      <div>{user.username}</div>
      <img
        className={classes['user-image']}
        src={user.image || Image}
        alt={user.username}
      />
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
      <Link className={classes['logo-name']} to="/">
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
