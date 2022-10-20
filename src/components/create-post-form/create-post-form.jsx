/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useState } from 'react'
// import updateProfile from '../../actions/update-profile'
// import getCurrentUser from '../../actions/get-current-user'

import postArticle from '../../actions/post-article'

import classes from './create-post-form.module.scss'

export default function CreatePostForm() {
  const [tagKeyValue, addKeyValue] = useState(1)
  const [tags, editTagsArr] = useState([{ id: 0, value: '' }])
  const [postStatus, editPostStatus] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.currentUser)
  const token = localStorage.getItem('token')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    data.tagList = tags.map(({ value }) => value)
    dispatch(postArticle(data, token))
    editPostStatus(true)
  }

  const deleteTag = (id) =>
    editTagsArr((tagsList) => {
      const idx = tagsList.findIndex((el) => id === el.id)

      return [...tagsList.slice(0, idx), ...tagsList.slice(idx + 1)]
    })

  const addTag = (id) =>
    editTagsArr((tagsList) => [...tagsList, { id, value: '' }])

  const editTagValue = (id, text) =>
    editTagsArr((tagsList) => {
      const idx = tagsList.findIndex((el) => id === el.id)

      const updatedItem = {
        ...tagsList[idx],
        value: text,
      }

      return [
        ...tagsList.slice(0, idx),
        updatedItem,
        ...tagsList.slice(idx + 1),
      ]
    })

  if (!user || postStatus) {
    return <Redirect to="/" />
  }

  return (
    <div className={classes['post-form']}>
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
            {...register('body', {
              required: {
                value: true,
                message: 'Поле обязательно для заполнения',
              },
              min: 5,
            })}
          />
          {errors.body && (
            <p className={classes['error-message']}>{errors.body.message}</p>
          )}
        </label>
        <label htmlFor="tags" className={classes.tags}>
          Tags
          {tags.map(({ id, value }) => (
            <div className={classes.tag} key={id}>
              <input
                type="text"
                defaultValue={value}
                onChange={(e) => editTagValue(id, e.target.value)}
              />
              <button
                type="button"
                className={classes['delete-tag']}
                onClick={() => {
                  if (tags.length === 1) {
                    return
                  }
                  deleteTag(id)
                }}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            type="button"
            className={classes['add-tag']}
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
