/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { signUp } from '../../actions/sign-up'

import classes from './sign-up-form.module.scss'

export default function SignUpForm() {
  const dispatch = useDispatch()
  const signUpError = useSelector((state) => state.signUpStatus.errors || {})

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    getValues,
  } = useForm()

  useEffect(() => {
    setFocus('username')
    dispatch({ type: 'CLEAR_ERROR' })
  }, [setFocus])

  const onSubmit = (data) => {
    dispatch(signUp(data))
  }

  return (
    <div className={classes['sign-up-form']}>
      <h2>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">
          Username
          <input
            className={
              (signUpError.username || errors.username) &&
              classes['validate-error']
            }
            id="username"
            type="text"
            placeholder="Username"
            onClick={() => {
              dispatch({ type: 'CLEAR_ERROR' })
            }}
            {...register('username', {
              required: {
                value: true,
                message: 'Поле необходимо заполнить',
              },
              minLength: {
                value: 3,
                message: 'Минимальная длина имени 3 символа',
              },
              maxLength: {
                value: 20,
                message: 'Максимальная длина имени 20 символов',
              },
            })}
          />
          {signUpError.username && (
            <p className={classes['error-message']}>Это имя уже занято</p>
          )}
          {errors.username && (
            <p className={classes['error-message']}>
              {errors.username.message}
            </p>
          )}
        </label>
        <label htmlFor="email">
          Email address
          <input
            id="email"
            className={
              (signUpError.email || errors.email) && classes['validate-error']
            }
            type="email"
            placeholder="Email address"
            {...register('email', {
              required: {
                value: true,
                message: 'Поле необходимо заполнить',
              },
            })}
          />
          {signUpError.email && (
            <p className={classes['error-message']}>
              Этот адрес почты уже занят
            </p>
          )}
          {errors.email && (
            <p className={classes['error-message']}>{errors.email.message}</p>
          )}
        </label>
        <label htmlFor="password">
          Password
          <input
            id="password"
            type="password"
            placeholder="Password"
            className={errors.password && classes['validate-error']}
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
        <label htmlFor="repeat_password">
          Repeat Password
          <input
            id="repeat_password"
            type="password"
            placeholder="Password"
            className={errors.repeat_password && classes['validate-error']}
            {...register('repeat_password', {
              required: {
                value: true,
                message: 'Поле необходимо заполнить',
              },
            })}
          />
          {getValues('repeat_password') !== getValues('password') && (
            <p className={classes['error-message']}>Пароли должны совпадать!</p>
          )}
        </label>

        <div className={classes.divider} />

        <label htmlFor="checkbox">
          <input
            id="checkbox"
            type="checkbox"
            placeholder="checkbox"
            {...register('checkbox', {
              required: {
                value: true,
                message: 'Необходимо согласиться с требованиями',
              },
            })}
          />
          {errors.checkbox && (
            <p className={classes['error-message']}>
              {errors.checkbox.message}
            </p>
          )}
          <p>I agree to the processing of my personal information</p>
          <span className={classes.checkmark} />
        </label>
        <input type="submit" value="Create" />
      </form>
      <div className={classes.redirect}>
        Don’t have an account? <Link to="/sign-in">Sign In</Link>
      </div>
    </div>
  )
}
