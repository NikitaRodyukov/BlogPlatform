import { Link } from 'react-router-dom'

import classes from './header.module.scss'

export default function Header() {
  return (
    <div className={classes.header}>
      <Link className={classes['logo-name']} to="/">
        Realworld Blog
      </Link>
      <div className={classes['btns-block']}>
        <Link to="/sign-in" className={classes['btn__sign-in']}>
          Sign In
        </Link>
        <Link to="/sign-up" className={classes['btn__sign-up']}>
          Sign Up
        </Link>
      </div>
    </div>
  )
}
