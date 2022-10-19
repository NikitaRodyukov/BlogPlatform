/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

import updateProfile from '../../actions/update-profile'
import getCurrentUser from '../../actions/get-current-user'

import classes from './profile-edit-form.module.scss'

export default function ProfileEditForm() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.currentUser)
  const token = localStorage.getItem('token')
  const signUpError = useSelector((state) => state.signUpStatus.errors || {})

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm()

  useEffect(() => {
    setFocus('username')
    dispatch({ type: 'CLEAR_ERROR' })
  }, [setFocus])

  const onSubmit = (data) => {
    if (data.image === '') {
      const newData = JSON.parse(JSON.stringify(data))
      newData.image = user.image
      dispatch(updateProfile(newData))
    } else {
      dispatch(updateProfile(data))
    }

    if (!signUpError.email && !signUpError.username) {
      dispatch(getCurrentUser(token))
    }
  }

  if (!user) {
    return <Redirect to="/" />
  }

  return (
    <div className={classes['sign-up-form']}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">
          Username
          <input
            id="username"
            type="text"
            placeholder="Username"
            defaultValue={user.username || ''}
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
            type="email"
            placeholder="Email address"
            defaultValue={user.email || ''}
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
            placeholder="New password"
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
        <label htmlFor="url">
          Avatar image (url)
          <input
            type="url"
            id="url"
            className={errors.url && classes['validate-error']}
            placeholder="Avatar image"
            {...register('image', {
              pattern: {
                value: /^http.*\.(jpeg|jpg|gif|png)$/,
                message: 'Please enter a valid image link',
              },
            })}
          />
          {errors.image && (
            <p className={classes['error-message']}>{errors.image.message}</p>
          )}
        </label>
        <input type="submit" value="Save" />
      </form>
    </div>
  )
}
