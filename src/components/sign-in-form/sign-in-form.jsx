/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'

import { signIn } from '../../actions/sign-in'

import classes from './sign-in-form.module.scss'

export default function SignInForm() {
  const isLogedIn = useSelector((state) => state.currentUser.user)
  const dispatch = useDispatch()
  const signInError = useSelector((state) => state.signInStatus.errors || {})

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm()

  useEffect(() => {
    setFocus('email')

    dispatch({ type: 'CLEAR_ERROR' })
  }, [setFocus])

  const onSubmit = (data) => {
    dispatch(signIn(data))
  }

  if (isLogedIn) return <Redirect to="/" />
  return (
    <div className={classes['sign-up-form']}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">
          Email address
          <input
            id="email"
            type="email"
            placeholder="Email address"
            onClick={() => {
              dispatch({ type: 'CLEAR_ERROR' })
            }}
            {...register('email', {
              required: {
                value: true,
                message: 'Поле необходимо заполнить',
              },
            })}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </label>

        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            placeholder="Password"
            style={errors.password && { border: '1px solid red' }}
            onClick={() => {
              dispatch({ type: 'CLEAR_ERROR' })
            }}
            {...register('password', {
              required: {
                value: true,
                message: 'Поле необходимо заполнить',
              },
              minLength: {
                value: 6,
                message: 'Минимальная длина пароля 6 символов',
              },
              maxLength: {
                value: 40,
                message: 'Максимальная длина пароля 40 символов',
              },
            })}
          />
          {errors.password && (
            <p className={classes['error-message']}>
              {errors.password.message}
            </p>
          )}
        </label>

        {signInError['email or password'] && (
          <p className={classes['error-message']}>
            Ошибка ввода пароля или адреса почты
          </p>
        )}

        <input type="submit" value="Login" />
      </form>
      <div className={classes.redirect}>
        Don`t have an account? <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
  )
}
