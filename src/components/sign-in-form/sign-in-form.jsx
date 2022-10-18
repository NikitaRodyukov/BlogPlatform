/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { signUp } from '../../actions/sign-up'

import classes from './sign-in-form.module.scss'

export default function SignInForm() {
  const dispatch = useDispatch()
  const signUpError = useSelector((state) => state.signUpStatus.errors || {})

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
    dispatch(signUp(data))
  }

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
            {...register('email', {
              required: {
                value: true,
                message: 'Поле необходимо заполнить',
              },
            })}
          />
          {signUpError.email && <p>Этот адрес почты уже занят</p>}
          {errors.email && <p>{errors.email.message}</p>}
        </label>

        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            placeholder="Password"
            style={errors.password && { border: '1px solid red' }}
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
          {errors.password && <p>{errors.password.message}</p>}
        </label>

        <input type="submit" value="Login" />
      </form>
      <div className={classes.redirect}>
        Don’t have an account? <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
  )
}
