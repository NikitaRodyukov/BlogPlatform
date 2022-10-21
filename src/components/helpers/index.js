export const deleteTag = (id, editTagsArr) =>
  editTagsArr((tagsList) => {
    const idx = tagsList.findIndex((el) => id === el.id)

    return [...tagsList.slice(0, idx), ...tagsList.slice(idx + 1)]
  })

export const addTag = (id, editTagsArr) =>
  editTagsArr((tagsList) => [...tagsList, { id, value: '' }])

export const editTagValue = (id, text, editTagsArr) =>
  editTagsArr((tagsList) => {
    const idx = tagsList.findIndex((el) => id === el.id)

    const updatedItem = {
      ...tagsList[idx],
      value: text,
    }

    return [...tagsList.slice(0, idx), updatedItem, ...tagsList.slice(idx + 1)]
  })
