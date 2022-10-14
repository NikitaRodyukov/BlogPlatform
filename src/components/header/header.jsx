import { Link } from 'react-router-dom'

import classes from './header.module.scss'

export default function Header() {
  return (
    <div className={classes.header}>
      <Link className={classes['logo-name']} to="/">
        Realworld Blog
      </Link>
      <div className={classes['btns-block']}>
        <button type="button" className={classes['btn__sign-in']}>
          Sign In
        </button>
        <button type="button" className={classes['btn__sign-up']}>
          Sign Up
        </button>
      </div>
    </div>
  )
}
