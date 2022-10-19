/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'
// import { useDispatch, useSelector } from 'react-redux'
// import { Redirect } from 'react-router-dom'
import { useState } from 'react'
// import updateProfile from '../../actions/update-profile'
// import getCurrentUser from '../../actions/get-current-user'

import classes from './post-form.module.scss'

export default function PostForm() {
  const [tagKeyValue, addKeyValue] = useState(0)
  const [tags, editTagsArr] = useState([])

  // const dispatch = useDispatch()
  // const { user } = useSelector((state) => state.currentUser)
  // const token = localStorage.getItem('token')
  // const signUpError = useSelector((state) => state.signUpStatus.errors || {})

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    data.tags = tags.map(({ value }) => value)
    console.log(data)
  }

  const deleteTag = (id) =>
    editTagsArr((oldTagData) => {
      const idx = oldTagData.findIndex((el) => id === el.id)
      return [...oldTagData.slice(0, idx), ...oldTagData.slice(idx + 1)]
    })

  const addTag = (id) =>
    editTagsArr((oldTagData) => [...oldTagData, { id, value: '' }])

  const editTagValue = (id, text) =>
    editTagsArr((oldTagData) => {
      const idx = oldTagData.findIndex((el) => id === el.id)
      const updatedItem = {
        ...oldTagData[idx],
        value: text,
      }

      return [
        ...oldTagData.slice(0, idx),
        updatedItem,
        ...oldTagData.slice(idx + 1),
      ]
    })

  // if (!user) {
  //  return <Redirect to="/" />
  // }

  return (
    <div className={classes['sign-up-form']}>
      <h2>Create new article</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="text">
          Title
          <input
            type="text"
            id="title"
            placeholder="Title"
            {...register('title', {
              required: {
                value: true,
                message: 'Поле обязательно для заполнения',
              },
              min: 5,
            })}
          />
          {errors.title && (
            <p className={classes['error-message']}>{errors.title.message}</p>
          )}
        </label>
        <label htmlFor="description">
          Short description
          <input
            type="text"
            id="description"
            placeholder="description"
            {...register('description', {
              required: {
                value: true,
                message: 'Поле обязательно для заполнения',
              },
              min: 5,
            })}
          />
          {errors.description && (
            <p className={classes['error-message']}>
              {errors.description.message}
            </p>
          )}
        </label>
        <label htmlFor="textarea">
          Text
          <textarea
            placeholder="Enter your text..."
            {...register('text', {
              required: {
                value: true,
                message: 'Поле обязательно для заполнения',
              },
              min: 5,
            })}
          />
          {errors.text && (
            <p className={classes['error-message']}>{errors.text.message}</p>
          )}
        </label>
        <label htmlFor="tags">
          Tags
          {tags.map(({ id, value }) => (
            <div className="tag" key={id}>
              <input
                type="text"
                defaultValue={value}
                onChange={(e) => editTagValue(id, e.target.value)}
              />
              <button type="button" onClick={() => deleteTag(id)}>
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className="add-tag"
            onClick={() => {
              addKeyValue((value) => value + 1)
              addTag(tagKeyValue)
            }}
          >
            Add tag
          </button>
        </label>
        <input type="submit" value="Send" />
      </form>
    </div>
  )
}
