/* eslint-disable react/jsx-props-no-spreading */
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useState, useEffect } from 'react'

import getFullPost from '../../actions/get-full-post'
import postEditedArticle from '../../actions/post-edited-article'
import { deleteTag, addTag, editTagValue } from '../helpers/index'

import classes from './edit-post-form.module.scss'

export default function EditPostForm({ slug }) {
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const [tagKeyValue, addKeyValue] = useState(0)
  const [tags, editTagsArr] = useState([])
  const {
    redirectStatus,
    fullPost: { title, description, body, tagList },
  } = useSelector((state) => state)

  useEffect(() => {
    let tagId = 0

    dispatch(getFullPost(slug))
    const tagsToAdd =
      tagList &&
      tagList.map((value) => {
        const tag = { id: tagId, value }
        tagId += 1
        return tag
      })

    addKeyValue(tagId)

    if (!tagsToAdd) {
      editTagsArr((tagsList) => [...tagsList, { id: 0, value: '' }])
    } else {
      editTagsArr(tagsToAdd)
    }
  }, [tagList.length])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {
    data.tagList = tags.map(({ value }) => value)
    dispatch(postEditedArticle(data, token, slug))
  }

  if (redirectStatus) {
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
          {tags &&
            tags.map(({ id, value }) => (
              <div className={classes.tag} key={id}>
                <input
                  type="text"
                  defaultValue={value}
                  onChange={(e) =>
                    editTagValue(id, e.target.value, editTagsArr)
                  }
                />
                <button
                  type="button"
                  className={classes['delete-tag']}
                  onClick={() => {
                    if (tags.length === 1) {
                      return
                    }
                    deleteTag(id, editTagsArr)
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
              addTag(tagKeyValue, editTagsArr)
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
