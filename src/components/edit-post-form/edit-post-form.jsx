/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'
// import updateProfile from '../../actions/update-profile'
// import getCurrentUser from '../../actions/get-current-user'

import getFullPost from '../../actions/get-full-post'
import postEditedArticle from '../../actions/post-edited-article'

import classes from './edit-post-form.module.scss'

export default function EditPostForm({ slug }) {
  const dispatch = useDispatch()
  const [tagKeyValue, addKeyValue] = useState(1)
  const [tags, editTagsArr] = useState([])
  const [postStatus, editPostStatus] = useState(false)

  const { user } = useSelector((state) => state.currentUser)
  const token = localStorage.getItem('token')

  const { title, description, body, tagList } = useSelector(
    (state) => state.fullPost
  )

  useEffect(() => {
    dispatch(getFullPost(slug))
    const tagsToAdd =
      !tagList &&
      tagList.map((value) => {
        addKeyValue((v) => v + 1)
        return { id: tagKeyValue, value }
      })

    if (!tagList.length && !tagsToAdd) {
      editTagsArr((tagsList) => [...tagsList, { id: 0, value: '' }])
    } else {
      editTagsArr(tagsToAdd)
    }
  }, [slug])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    data.tagList = tags.map(({ value }) => value)
    dispatch(postEditedArticle(data, token, slug))
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
      <h2>Edit article</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="text">
          Title
          <input
            type="text"
            id="title"
            placeholder="Title"
            defaultValue={title}
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
            defaultValue={description}
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
            defaultValue={body}
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
